import { useState, useContext } from "react";
import "./profile.css";
import Header from "../../components/Header";
import Title from "../../components/Title";
import { FiSettings, FiUpload } from "react-icons/fi";
import avatar from "../../assets/avatar.png";
import { AuthContext } from "../../contexts/auth";

export default function Profile() {
	const { user, signOut } = useContext(AuthContext);
	const [nome, setNome] = useState(user && user.name);
	const [email, setEmail] = useState(user && user.email);
	const [avatarUrl, setAvatarUrl] = useState(user && user.avatarUrl);

	return (
		<div>
			<Header />
			<div className="content">
				<Title name="Meu Perfil">
					<FiSettings size={25} />
				</Title>
				<div className="container">
					<form clasName="form-profile">
						<label className="label-avatar">
							<span>
								<FiUpload color="fff" size={25} />
							</span>
							<input type="file" accept="image/*" />
							<br />
							{avatarUrl === null ? (
								<img
									src={avatar}
									width="250"
									height="250"
									alt="Foto de perfil do usuário"
								/>
							) : (
								<img
									src={avatarUrl}
									width="250"
									height="250"
									alt="Foto de perfil do usuário"
								/>
							)}
						</label>
						<label>Nome</label>
						<input
							ype="text"
							value={nome}
							onChange={(e) => setNome(e.target.value)}
						/>
						<label>Email</label>
						<input type="text" value={email} disabled={true} />
						<button type="submit">Salvar</button>
					</form>
					<div className="container">
						<button
							className="logout-btn"
							onClick={() => signOut()}
						>
							Sair
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}
