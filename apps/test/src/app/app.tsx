// eslint-disable-next-line @typescript-eslint/no-unused-vars
import styles from './app.module.scss';
import NxWelcome from './nx-welcome';
import { assign, createMachine, interpret } from 'xstate';
import { pure } from 'xstate/lib/actions';

interface ToggleContext {
  count: number;
  test: boolean;
}

type ToggleEvent = {
  type: 'TOGGLE';
};

// Edit your machine(s) here
const machine = createMachine<ToggleContext, ToggleEvent>(
  {
    id: 'machine',
    initial: 'inactive',
    context: {
      count: 0,
      test: false,
    },
    states: {
      inactive: {
        on: {
          TOGGLE: {
            target: 'active',
            actions: ['test'],
          },
        },
      },
      active: {
        on: { TOGGLE: 'inactive' },
      },
    },
  },
  {
    actions: {
      test: pure((context) => {
        return [assign((context) => ({ test: true }))];
      }),
    },
  }
);

// Edit your service(s) here
const service = interpret(machine).onTransition((state) => {
  console.log(state.value);
});

service.start();

service.send('TOGGLE');
service.send('TOGGLE');

export function App() {
  return (
    <>
      <NxWelcome title="test" />
      <div />
    </>
  );
}

export default App;
