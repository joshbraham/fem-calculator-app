interface HeaderProps {
	toggleTheme: () => void;
}

function Header({ toggleTheme }: HeaderProps) {
	return (
		<header role="banner">
			<h1>calc</h1>
			<div className="btn-theme--grid">
				<label className="btn-theme--label" htmlFor="btn-theme">
					theme
				</label>
				<p className="btn-theme--markings">
					{[1, 2, 3].map((number) => (
						<span key={number} className="btn-theme--marking">
							{number}
						</span>
					))}
				</p>
				<button id="btn-theme" onClick={toggleTheme}></button>
			</div>
		</header>
	);
}

export default Header;
