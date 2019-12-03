import './style.css';

import { component, html, useState } from 'haunted';
import { createMachine, invoke, reduce, state, transition } from "robot3";
import { useMachine } from 'haunted-robot';

import './signal';

const wait = time => () => new Promise(resolve => setTimeout(resolve, time));

const machine = createMachine({
  stop: state(
    transition('push', 'waiting')
  ),
  waiting: invoke(wait(1000),
    transition('done', 'go')
  ),
  go: invoke(wait(2000),
    transition('done', 'stop')
  ),
});

window.addEventListener('load', () => {

  const App = () => {
    const [count, setCount] = useState(0);
    const [current, send] = useMachine(machine);
    const state = current.name;

    function onPush() {
      setCount(count + 1);
      send('push');
    }

    return html`
      <div class="flex flex-col">
        <traffic-signal state=${state}></traffic-signal>
        <div class="text-center">
          <button .disabled=${state !== 'stop'} 
            class="px-4 py-2 bg-gray-300 rounded font-bold hover:bg-blue-300 hover:text-blue-900" 
            @click=${onPush}>Push</button>
        </div>
        <div class="mb-2 text-xs">You have pressed the button ${count} ${count === 1 ? 'time' : 'times'}</div>
      </div>
    `
  };

  customElements.define('app-root', component(App, { useShadowDOM: false }));

});
