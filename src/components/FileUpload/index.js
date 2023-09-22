import { Box, Text } from "@mantine/core";
import { Dropzone, IMAGE_MIME_TYPE } from "@mantine/dropzone";
import { useState } from "react";
import { toast } from "react-toastify";

import { FileEarmarkPlusFill, CheckCircleFill } from "@styled-icons/bootstrap"

const DropzoneChildren = ({ filename, uploaded, multiple }) => (
	<Box
		position="center"
		spacing="xl"
		display="flex"
		style={{ pointerEvents: "none", width: '100%', justifyContent: 'space-between', alignItems: 'center' }}
	>
		<div className="mr-5">
			{ !multiple ?
				uploaded ? <CheckCircleFill size="30"/> : <FileEarmarkPlusFill size="30"/>
				:
				<FileEarmarkPlusFill size="30"/>
			}
		</div>
		<div>
			<Text size="xl" inline>
				{ !multiple ?
					uploaded ? filename : 'Arrastre archivos aquí o clickee para abrir el explorador'
					:
					'Arrastre archivos aquí o clickee para abrir el explorador'
				}
			</Text>
            <Text size="sm" color="dimmed" inline mt={7}>
				{ !multiple ?
					!uploaded && 'El archivo deben ser una imagen'
					:
					'El archivo deben ser una imagen'
				}
			</Text>
		</div>
	</Box>
);

export default function FileUpload({ onChange, label, style, error, multiple, className, dropzoneClassName }) {
	const [uploaded, setUploaded] = useState(false)
	const [filename, setFilename] = useState('')
	return (
		<div style={style} className={className}>
            <Text className="block text-sm font-semibold leading-6 text-gray-900" style={{ display: 'inline-block', marginBottom: '4px', fontSize: '14px', fontWeight: 500, color: 'black', wordBreak: 'break-word', cursor: 'default', fontFamily: '-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif' }}>{label}</Text>
			<Dropzone
				accept={IMAGE_MIME_TYPE}
				onDrop={(file) => {
					onChange(file)
					setFilename(file[0].name)
					setUploaded(true)
				}}
				onReject={() => {
					toast.error("Archivo inválido", { position: "bottom-left" })
				}}
				maxSize={3 * 1024 ** 2}
				multiple={multiple}
                style={{border: error && '1px solid red', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem'}}
				className={dropzoneClassName}
			>
				<DropzoneChildren filename={filename} uploaded={uploaded} multiple={multiple}/>
			</Dropzone>
			{error && 
			<span
				style={{
					fontFamily: '-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica,Arial,sans-serif,Apple Color Emoji,Segoe UI Emoji',
					webkitTapHighlightColor: 'transparent',
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
