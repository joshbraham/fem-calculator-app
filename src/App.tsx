import { useCallback, useEffect, useMemo, useState } from "react";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Keypad from "./components/Keypad";
import Screen from "./components/Screen";
import "./styles/App.css";

function App() {
	const [input, setInput] = useState<string>("");

	const themes = useMemo(
		() => ["default-theme", "light-theme", "purple-theme"],
		[]
	);

	const switchTheme = useCallback(
		(newTheme: string) => {
			themes.forEach((item) => document.documentElement.classList.remove(item));
			document.documentElement.classList.add(newTheme);
			localStorage.setItem("theme", newTheme);
		},
		[themes]
	);

	useEffect(() => {
		console.log(localStorage.getItem("theme"));
		const initialTheme = localStorage.getItem("theme");

		if (initialTheme != null) {
			switchTheme(initialTheme);
		} else {
			switchTheme(
				window.matchMedia("(prefers-color-scheme: dark)").matches
					? "default-theme"
					: "light-theme"
			);
		}
		console.log(initialTheme);
	}, [switchTheme]);

	const handleError = () => {
		if (input === "ERROR") setInput("");
	};

	const formatExp = (expression: string) => {
		const matchObj: RegExpMatchArray | null =
			expression.match(/(\d+,?)*\.?\d+$/);
		const match: string | undefined = matchObj?.[0];
		if (match == null || /,\d*\./.test(match)) return expression;

		let unformatted: string = match.replaceAll(",", "");
		const pointIndex: number | null = match.indexOf(".");
		let floating = "";

		if (pointIndex !== -1) {
			floating = unformatted.slice(pointIndex);
			unformatted = unformatted.slice(0, pointIndex);
		}

		const lastIndex = unformatted.length - 1;
		let reformatted = "";
		for (let i = lastIndex; i >= 0; i--) {
			const char = unformatted[i];
			if (i !== lastIndex && (lastIndex - i) % 3 === 0) {
				reformatted = char + "," + reformatted;
			} else {
				reformatted = char + reformatted;
			}
		}
		return matchObj?.input?.slice(0, matchObj.index) + reformatted + floating;
	};

	const addInput = (value: string) => {
		handleError();
		setInput((currentInput) => formatExp(currentInput + value));
	};

	const deleteInput = () => {
		handleError();
		setInput((currentInput) => formatExp(currentInput.slice(0, -1)));
	};

	const clearInput = () => {
		setInput("");
	};

	const evaluateInput = () => {
		if (!input) return;
		try {
			const output = eval(input.replaceAll("x", "*").replaceAll(",", ""));
			setInput(
				formatExp(String(Number.isInteger(output) ? output : output.toFixed(2)))
			);
		} catch (error) {
			setInput("ERROR");
		}
	};

	const isThemeToggled = (theme: string) => {
		return document.documentElement.classList.contains(theme);
	};

	const toggleTheme = () => {
		for (let i = 0; i < themes.length; i++) {
			if (isThemeToggled(themes[i])) {
				switchTheme(themes[(i + 1) % themes.length]);
				break;
			}
		}
	};

	return (
		<>
			<Header toggleTheme={toggleTheme} />
			<main role="main">
				<Screen input={input} />
				<Keypad
					addInput={addInput}
					deleteInput={deleteInput}
					clearInput={clearInput}
					evaluateInput={evaluateInput}
				/>
			</main>
			<Footer />
		</>
	);
}

export default App;
