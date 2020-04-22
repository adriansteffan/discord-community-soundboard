import React from 'react';
import './upload-tab.css';
import Dropzone from 'react-dropzone';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default ({onDrop, onTextChange, onSubmit, currentName, currentFile, resetFile}) => {
	
	const textInput = React.createRef();

	return (
		<div className="upload-container">
			<Dropzone  onDrop={acceptedFiles => onDrop(acceptedFiles[0])}>
				{({getRootProps, getInputProps}) => (
				<section className="drop-container noselect">
					<div className="drop-area" {...getRootProps()}>
					<input {...getInputProps({disabled: currentFile != null})} />
					{	
						(currentFile == null) ?
						<p>Drag 'n' drop some files here, or click to select files</p> :
						<div>
							<label>{currentFile.name}</label>
							<FontAwesomeIcon icon={['fas','times']} className="fa-icon" style={{color:"#99aab5"}} onClick={()=>resetFile()}/>
						</div>
					}
					
					</div>
				</section>
				)}
			</Dropzone>
			<div>
				<form onSubmit={(e)=> {e.preventDefault(); textInput.current.blur();}}>
					<label>Name</label><br/>
					<input type="text" value={currentName} ref={textInput} onChange={onTextChange}></input><br/>
				</form>

				<button onClick={onSubmit}>Upload</button>
			</div>

		</div>
	);
};
          
            