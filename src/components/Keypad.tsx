const keys = [
	{
		value: "7",
		clrScheme: "primary",
		long: false,
	},
	{
		value: "8",
		clrScheme: "primary",
		long: false,
	},
	{
		value: "9",
		clrScheme: "primary",
		long: false,
	},
	{
		value: "DEL",
		clrScheme: "secondary",
		long: false,
	},
	{
		value: "4",
		clrScheme: "primary",
		long: false,
	},
	{
		value: "5",
		clrScheme: "primary",
		long: false,
	},
	{
		value: "6",
		clrScheme: "primary",
		long: false,
	},
	{
		value: "+",
		clrScheme: "primary",
		long: false,
	},
	{
		value: "1",
		clrScheme: "primary",
		long: false,
	},
	{
		value: "2",
		clrScheme: "primary",
		long: false,
	},
	{
		value: "3",
		clrScheme: "primary",
		long: false,
	},
	{
		value: "-",
		clrScheme: "primary",
		long: false,
	},
	{
		value: ".",
		clrScheme: "primary",
		long: false,
	},
	{
		value: "0",
		clrScheme: "primary",
		long: false,
	},
	{
		value: "/",
		clrScheme: "primary",
		long: false,
	},
	{
		value: "x",
		clrScheme: "primary",
		long: false,
	},
	{
		value: "RESET",
		clrScheme: "secondary",
		long: true,
	},
	{
		value: "=",
		clrScheme: "accent",
		long: true,
	},
];

interface KeypadProps {
	addInput: (input: string) => void;
	clearInput: () => void;
	deleteInput: () => void;
	evaluateInput: () => void;
}

function Keypad({
	addInput,
	deleteInput,
	clearInput,
	evaluateInput,
}: KeypadProps) {
	return (
		<section className="keypad">
			{keys.map((key, idx) => {
				const keyClasses = `key ${key.clrScheme} ${
					key.long ? "long" : ""
				}`.trimEnd();

				const keyTextClasses = `key__text ${
					/del|reset|=/i.test(key.value) ? "fs-small" : ""
				}`.trimEnd();

				const handleClick = (() => {
					switch (key.value) {
						case "DEL":
							return deleteInput;
						case "RESET":
							return clearInput;
						case "=":
							return evaluateInput;
						default:
							return () => addInput(key.value);
					}
				})();

				return (
					<button key={idx} className={keyClasses} onClick={handleClick}>
						<span className={keyTextClasses}>{key.value}</span>
					</button>
				);
			})}
		</section>
	);
}

export default Keypad;
