import { useState } from "react";
import "./customers.css";
import Title from "../../components/Title";
import Header from "../../components/Header";
import { FiUser } from "react-icons/fi";
import firebase from "../../services/firebaseConnection";
import { toast } from "react-toastify";

export default function Customers() {
	const [nomeFantasia, setNomeFantasia] = useState("");
	const [cnpj, setCnpj] = useState("");
	const [endereco, setEndereco] = useState("");

	function handleAdd(e) {
		e.preventDefault();
		if (nomeFantasia !== "" && cnpj !== "" && endereco !== "") {
			firebase
				.firestore()
				.collection("customers")
				.add({
					nomeFantasia: nomeFantasia,
					cnpj: cnpj,
					endereco: endereco,
				})
				.then(() => {
					setNomeFantasia("");
					setCnpj("");
					setEndereco("");
					toast.info("Empresa cadastrada com sucesso");
				})
				.catch((error) => {
					console.log(error);
					toast.error("Erro ao cadastrar essa empresa");
				});
		} else {
			toast.error("Preencha todos os campos!");
		}
	}

	return (
		<div>
			<Header />
			<div className="content">
				<Title name="Clientes">
					<FiUser size={25} />
				</Title>
				<div className="container">
					<form className="form-profile customers" onSubmit={handleAdd}>
						<label>Nome Fantasia</label>
						<input
							type="text"
							placeholder="Nome de sua empresa"
							value={nomeFantasia}
							onChange={(e) => setNomeFantasia(e.target.value)}
						/>
						<label>CNPJ</label>
						<input
							type="text"
							placeholder="CNPJ"
							value={cnpj}
							onChange={(e) => setCnpj(e.target.value)}
						/>
						<label>Endereço</label>
						<input
							type="text"
							placeholder="Endereço da Empresa"
							value={endereco}
							onChange={(e) => setEndereco(e.target.value)}
						/>
						<button type="submit">Cadastrar</button>
					</form>
				</div>
			</div>
		</div>
	);
}
