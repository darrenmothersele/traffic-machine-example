import {component, html} from "haunted";

const baseClasses = 'mb-4 m-auto rounded-full w-32 h-32 text-xl font-bold tracking-wider ' +
  'uppercase text-white flex items-center justify-center';

function getClass(state) {
  switch (state) {
    case 'stop':
      return 'bg-red-600';
    case 'waiting':
      return 'bg-yellow-600';
    case 'go':
      return 'bg-green-600';
  }
}

const signal = ({state}) => {
  return html`
    <div class=${baseClasses + ' ' + getClass(state)}>${state}</div>
  `;
};

signal.observedAttributes = ['state'];

customElements.define('traffic-signal', component(signal, {useShadowDOM: false}));
