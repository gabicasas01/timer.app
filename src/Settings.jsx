import React, { useState } from 'react';
import Toggle from 'react-toggle';
import 'react-toggle/style.css';

const Settings = ({ setTime, setRepeat, onClose }) => {
  const [timeInput, setTimeInput] = useState(25);
  const [repeatInput, setRepeatInput] = useState(false);

  const handleTimeChange = (e) => {
    setTimeInput(e.target.value);
  };

  const handleRepeatChange = (e) => {
    setRepeatInput(e.target.checked);
  };

  const handleSave = () => {
    setTime(timeInput);
    setRepeat(repeatInput);
    onClose();
  };

  return (
    <div className="fixed z-50 top-0 left-0 w-full h-full bg-[#0A192F] flex items-center justify-center">
      <div className="bg-white rounded-md shadow-md p-4">
        <h2 className="text-lg font-semibold mb-4">Opciones</h2>
        <div className="flex items-center mb-4">
          <label htmlFor="time-input" className="mr-2">
            Tiempo (segundos):
          </label>
          <input
            type="number"
            id="time-input"
            className="border border-gray-300 rounded-md px-2 py-1 w-20"
            min="1"
            max="3600"
            value={timeInput}
            onChange={handleTimeChange}
          />
        </div>
        <div className="flex items-center mb-4">
          <label htmlFor="repeat-input" className="mr-2">
            Repetir:
          </label>
          <Toggle
            id="repeat-input"
            checked={repeatInput}
            onChange={handleRepeatChange}
          />
          <label htmlFor="repeat-input" className="select-none ml-2 font-medium">
            {repeatInput ? 'On' : 'Off'}
          </label>
        </div>

        <div className="flex justify-center gap-1 mt-10">
          <button
            className="w-24 bg-[#255DAE] text-white font-medium px-4 py-2 rounded-full"
            onClick={handleSave}
          >
            Listo!
          </button>
          <button
            className="w-24 bg-[#BF2240] text-white font-medium px-4 py-2 rounded-full"
            onClick={onClose}
          >
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
};



export default Settings;
