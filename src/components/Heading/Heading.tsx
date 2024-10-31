type HeadingProps = {
	title: string
}

export default function Heading({title}: HeadingProps) {
	return <h1 className="heading-container__heading">{title}</h1>
}
