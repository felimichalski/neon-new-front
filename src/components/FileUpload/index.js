import { Group, Text, useMantineTheme } from "@mantine/core";
import { useState } from "react";
import { Dropzone, MIME_TYPES } from "@mantine/dropzone";
import { FileEarmarkX } from "@styled-icons/bootstrap"

export const dropzoneChildren = (status, theme) => (
	<Group
		position="center"
		spacing="xl"
		style={{ minHeight: 220, pointerEvents: "none" }}
	>
		<FileEarmarkX size="4x"/>
		<div>
			<Text size="xl" inline>
				Drag a file here or click to open the File Explorer
			</Text>
            <Text size="sm" color="dimmed" inline mt={7}>
				The file should be .pdf, .doc or .docx
			</Text>
		</div>
	</Group>
);

export default function FileUpload({ onChange, label, status, error, multiple }) {
	const theme = useMantineTheme();
	const [fileName, setFileName] = useState("");
	return (
		<div>
            <Text style={{ display: 'inline-block', marginBottom: '4px', fontSize: '14px', fontWeight: '500', color: '#C1C2C5', wordBreak: 'break-word', cursor: 'default', fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif' }}>{label}</Text>
			<Dropzone
				accept={[MIME_TYPES.jpeg, MIME_TYPES.avif, MIME_TYPES.png, MIME_TYPES.gif, MIME_TYPES.svg]}
				onDrop={files => {
					setFileName(files[0].name);
					onChange(files[0]);
				}}
				onReject={files => console.log("rejected files", files)}
				maxSize={3 * 1024 ** 2}
				multiple={multiple}
                style={{height: '100%', border: error && '1px solid red'}}
			>
				{status => dropzoneChildren(status, theme)}
			</Dropzone>
			{fileName && 
			<h5>{fileName}</h5>
			}
			{error && 
			<span
				style={{
					fontFamily: '-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica,Arial,sans-serif,Apple Color Emoji,Segoe UI Emoji',
					webkitTapHighlightColor: 'transparent',
					color: 'inherit',
					fontSize: '14px',
					lineHeight: '1.55',
					webkitTextDecoration: 'none',
					textDecoration: 'none',
					marginTop: '5px',
					wordBreak: 'break-word',
					color: '#fa5252'
				}}
			>
				{error}
			</span>
			}
		</div>
	);
}
