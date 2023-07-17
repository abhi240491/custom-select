import React from 'react';
import CustomSelect from './customSelect';

const App = () => {
  const options = ['Option 1', 'Option 2', 'Option 3', 'Option 4'];

  const handleSelectChange = (selectedOptions) => {
    console.log('Selected options:', selectedOptions);
  };

  return (
    <div>
      <h2>Custom Select Component</h2>
      <CustomSelect options={options} onChange={handleSelectChange} />
    </div>
  );
};

export default App;