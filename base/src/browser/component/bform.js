import { Field } from 'fibo-browser-form';

const fld = Field.create('select', 'select', {
  choices: [
    { 
      id: 1,
      name: 'Kaamelott',
    },
    { 
      id: 2,
      name: "Reflet d'acide",
    },
    {
      id: 3,
      name: "Donjon de Naheulbeuk"
    }
  ],
  choiceDefine: (c) => [c.name, c.id],
});

export default fld;
