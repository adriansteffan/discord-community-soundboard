import React from 'react';
import './upload-tab.css';
import Dropzone from 'react-dropzone';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import TextInput from '../basic/TextInput';
import SubmitButton from '../basic/SubmitButton';

export default ({onDrop, onTextChange, onSubmit, currentName, currentFile, resetFile}) => {
	
	

	return (
		<div className="upload-container">
			<Dropzone  onDrop={acceptedFiles => onDrop(acceptedFiles[0])}>
				{({getRootProps, getInputProps}) => (
				<section className="drop-container noselect">
					<div className="drop-area" {...getRootProps()}>
					<input  {...getInputProps({disabled: currentFile != null, accept: ".mp3"})} />
					{	
						(currentFile == null) ?
						<p>Drag 'n' drop your mp3 here, or click to select files</p> :
						<div className="upload-file-container">
							<label>{currentFile.name}</label>
							<FontAwesomeIcon icon={['fas','times']} className="fa-icon" style={{color:"#99aab5"}} onClick={()=>resetFile()}/>
						</div>
					}
					
					</div>
				</section>
				)}
			</Dropzone>
			<div>
				<label>Name</label><br/>
				<TextInput style={{height:"40%"}}value={currentName} onChange={onTextChange}/><br/>
				<SubmitButton onClick={onSubmit}>Upload</SubmitButton>
			</div>

		</div>
	);
};
          
            