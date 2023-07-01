import { Group, Text } from "@mantine/core";
import { Dropzone, MIME_TYPES } from "@mantine/dropzone";
import { FileEarmarkPlusFill } from "@styled-icons/bootstrap"

const DropzoneChildren = () => (
	<Group
		position="center"
		spacing="xl"
		style={{ pointerEvents: "none", width: '100%' }}
	>
		<FileEarmarkPlusFill size="30"/>
		<div>
			<Text size="xl" inline>
				Arrastre archivos aquí o clickee para abrir el explorador
			</Text>
            <Text size="sm" color="dimmed" inline mt={7}>
				Los archivos deben ser una imágenes
			</Text>
		</div>
	</Group>
);

export default function FileUpload({ onChange, label, style, error, multiple }) {
	return (
		<div style={style}>
            <Text style={{ display: 'inline-block', marginBottom: '4px', fontSize: '14px', fontWeight: 500, color: 'black', wordBreak: 'break-word', cursor: 'default', fontFamily: '-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif' }}>{label}</Text>
			<Dropzone
				accept={[MIME_TYPES.jpeg, MIME_TYPES.avif, MIME_TYPES.png, MIME_TYPES.gif, MIME_TYPES.svg]}
				onDrop={files => {
					onChange(files);
				}}
				onReject={files => console.log("rejected files", files)}
				maxSize={3 * 1024 ** 2}
				multiple={multiple}
                style={{border: error && '1px solid red', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem'}}
			>
				<DropzoneChildren />
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
