import React, { useState } from 'react';

const ProjectStructureSidebar = () => {
  const [folders, setFolders] = useState([{ name: 'root', content: '', children: [] }]);
  const [openedItem, setOpenedItem] = useState(null);
  const [content, setContent] = useState('');

  const createFile = (parentFolder) => {
    const fileName = prompt('Enter the name of the new file:');
    if (fileName) {
      const updatedFolders = folders.map(folder => {
        if (folder === parentFolder) {
          return {
            ...folder,
            children: [...folder.children, { name: fileName, content: '', preview: '' }]
          };
        }
        return folder;
      });
      setFolders(updatedFolders);
      console.log(`Created file: ${fileName}`);
    }
  };

  const createFolder = (parentFolder) => {
    const folderName = prompt('Enter the name of the new folder:');
    if (folderName) {
      const updatedFolders = folders.map(folder => {
        if (folder === parentFolder) {
          return {
            ...folder,
            children: [...folder.children, { name: folderName, content: '', children: [] }]
          };
        }
        return folder;
      });
      setFolders(updatedFolders);
      console.log(`Created folder: ${folderName}`);
    }
  };

  const handleItemClick = (item) => {
    setOpenedItem(item); // Open the clicked item
    setContent(item.content); // Set content of the clicked item
  };

  const handleContentChange = (e) => {
    setContent(e.target.value);
    if (openedItem) {
      const updatedFolders = folders.map(folder => {
        if (folder === openedItem) {
          return { ...folder, content: e.target.value };
        }
        return folder;
      });
      setFolders(updatedFolders);
    }
  };

  const handlePreview = (file) => {
    const updatedFolders = folders.map(folder => {
      if (folder === openedItem) {
        return {
          ...folder,
          children: folder.children.map(child => {
            if (child === file) {
              return { ...child, preview: content };
            }
            return child;
          })
        };
      }
      return folder;
    });
    setFolders(updatedFolders);
  };

  const renderFolders = (folders) => {
    return folders.map((folder, index) => (
      <div key={index}>
        <div onClick={() => handleItemClick(folder)} style={{ marginBottom: '5px', cursor: 'pointer' }}>
          <strong>{folder.name}</strong>
        </div>
        {openedItem === folder && (
          <>
            <button onClick={() => createFile(folder)}>Create File</button>
            <button onClick={() => createFolder(folder)}>Create Folder</button>
            <textarea
              value={content}
              onChange={handleContentChange}
              style={{ marginLeft: '10px', width: '200px', height: '100px' }}
            />
          </>
        )}
        {folder.children && folder.children.length > 0 && renderFolders(folder.children)}
      </div>
    ));
  };

  const renderFiles = (files) => {
    return files.map((file, index) => (
      <div key={index}>
        <div onClick={() => handleItemClick(file)} style={{ marginBottom: '5px', cursor: 'pointer' }}>
          {file.name}
          <button onClick={() => handlePreview(file)}>Preview</button>
        </div>
        {openedItem === file && (
          <>
            <textarea
              value={content}
              onChange={handleContentChange}
              style={{ marginLeft: '10px', width: '200px', height: '100px' }}
            />
            <div>Preview:</div>
            <div>{file.preview}</div>
          </>
        )}
      </div>
    ));
  };

  return (
    <div className='project-sidebar'>
      <h2 className='project-sidebar h2'>Project Structure Sidebar</h2>
      <div>
        <button className='project-sidebar button ' onClick={() => createFile(folders[0])}>Create File</button>
        <button className='project-sidebar button ' onClick={() => createFolder(folders[0])}>Create Folder</button>
      </div>
      <div>
        <h3>Files and Folders</h3>
        {renderFolders(folders)}
        {renderFiles(folders[0].children)}
      </div>
    </div>
  );
};

export default ProjectStructureSidebar;
