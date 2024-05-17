import React, { useState } from 'react';
import axios from 'axios';

const CodeEditor = () => {
  const [code, setCode] = useState(`// HelloWorld.sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract HelloWorld {
    string public message;

    // Constructor to initialize the message
    constructor() {
        message = "Hello, World!";
    }

    // Function to get the message
    function getMessage() public view returns (string memory) {
        return message;
    }

    // Function to set a new message
    function setMessage(string memory newMessage) public {
        message = newMessage;
    }
}`);
  const [errors, setErrors] = useState([]);
  const [output, setOutput] = useState('');

  const handleChange = (e) => {
    setCode(e.target.value);
  };

  const handleCompile = async () => {
    try {
      console.log('Compiling Solidity code...');
      
      const input = {
        language: 'Solidity',
        sources: {
          'HelloWorld.sol': {
            content: code,
          },
        },
        settings: {
          outputSelection: {
            '*': {
              '*': ['evm.bytecode', 'evm.deployedBytecode', 'abi'],
            },
          },
        },
      };

      // Use CORS proxy for testing
      const corsProxy = 'https://cors-anywhere.herokuapp.com/';
      const apiUrl = 'https://api.example.com/compile';
      const response = await axios.post(corsProxy + apiUrl, input);

      if (response.data.errors) {
        setErrors(response.data.errors);
        setOutput('');
      } else {
        setErrors([]);
        setOutput(JSON.stringify(response.data, null, 2));
      }
    } catch (error) {
      console.error('Error compiling Solidity code:', error);

      if (error.response) {
        setErrors([`Server responded with status ${error.response.status}: ${error.response.data}`]);
      } else if (error.request) {
        setErrors(['No response received from the server. Please check the API endpoint and your network connection.']);
      } else {
        setErrors([`Error in setting up the request: ${error.message}`]);
      }

      setOutput('');
    }
  };

  return (
    <div className='code-editor'>
      <h2 className='code-editor h2'>CodeEditor</h2>
      <textarea className='code-editor textarea'  value={code} onChange={handleChange} rows="20" cols="70" />
      <br />
      <button onClick={handleCompile}>Compile</button>
      <div className='error'>
        <h3 >Errors</h3>
        <pre>{errors.length > 0 ? errors.join('\n') : 'No errors'}</pre>
      </div>
      <div className='output'>
        <h3>Output</h3>
        <pre>{output}</pre>
      </div>
    </div>
  );
};

export default CodeEditor;
