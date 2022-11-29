import { useContext } from "react";
import { AuthContext } from "../../contexts/auth";
import Header from "../../components/Header";

export default function Dashboard() {
	const { signOut } = useContext(AuthContext);
	return (
		<div className="container">
			<Header />
			<h1>DashBoard</h1>
			<button onClick={() => signOut()}>Fazer Logout</button>
		</div>
	);
}
