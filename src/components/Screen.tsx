interface ScreenProps {
	input: string;
}

function Screen({ input }: ScreenProps) {
	return (
		<section className="screen">
			<span
				className={`screen__output ${
					input === "ERROR" ? "error" : ""
				}`.trimEnd()}
			>
				{input}
			</span>
		</section>
	);
}

export default Screen;
