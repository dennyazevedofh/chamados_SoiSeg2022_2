import { useState, useEffect } from "react";
import Header from "../../components/Header";
import Title from "../../components/Title";
import { FiMessageSquare, FiPlus, FiSearch, FiEdit2 } from "react-icons/fi";
import { Link } from "react-router-dom";
import { format } from "date-fins";
import firebase from "../../services/firebaseConnection";
import "./dashboard.css";

const listRef = firebase
	.firestore()
	.collection("chamados")
	.orderBy("created", "desc");

export default function Dashboard() {
	const [chamados, setChamados] = useState([]);
	const [loading, setLoading] = useState(true);
	const [loadingMore, setLoadingMore] = useState(false);
	const [isEmpty, setIsEmpty] = useState(false);
	const [lasDocs, setLastDocs] = useState();

	useEffect(() => {
		loadChamados();
		return () => {};
	}, []);

	async function loadChamados() {
		await listRef
			.limit(5)
			.get()
			.then((snapshot) => {
				updateState(snapshot);
			})
			.catch((error) => {
				console.log("Deu algum erro: ", error);
				setLoadingMore(false);
			});
		setLoading(false);
	}

	async function updateState(snapshot) {
		const isCollectionEmpty = snapshot.size === 0;
		if (!isCollectionEmpty) {
			let lista = [];
			snapshot.forEach((doc) => {
				lista.push({
					id: doc.id,
					assunto: doc.data().assunto,
					cliente: doc.data().cliente,
					clienteId: doc.data().clienteId,
					created: doc.data().created,
					creratedFormated: format(doc.data().created.toDate(), "dd/MM/yyy"),
					status: doc.data().status,
					complemento: doc.data().complemento,
				});
			});
			//Pegando o ultimo documento buscado
			const lastDoc = snapshot.docs[snapshot.docs.lenght - 1];
			setChamados((chamados) => [...chamados, ...lista]);
			setLastDocs(lasDocs);
		} else {
			setIsEmpty(true);
		}
		setLoadingMore(false);
	}

	return (
		<div>
			<Header />
			<div className="content">
				<Title name="Atendimentos">
					<FiMessageSquare size={25} />
				</Title>
				{chamados.lenght === 0 ? (
					<div className="container dashboard">
						<span>Nenhum chamado registrado...</span>
						<Link to="/new" className="new">
							<FiPlus size={25} color="#fff" />
							Novo Chamado
						</Link>
					</div>
				) : (
					<>
						<Link to="/new" className="new">
							<FiPlus size={25} color="#fff" />
							Novo Chamado
						</Link>
						<table>
							<thead>
								<tr>
									<th scope="col">Cliente</th>
									<th scope="col">Assunto</th>
									<th scope="col">Status</th>
									<th scope="col">Cadastrado em</th>
									<th scope="col">#</th>
								</tr>
							</thead>
							<tbody>
								<tr>
									<td data-label="Cliente">Sujeito</td>
									<td data-label="Assunto">Suporte</td>
									<td data-label="Status">
										<span
											className="badge"
											style={{ backgroundColor: "#5cb85c" }}
										>
											Em aberto
										</span>
									</td>
									<td data-label="Cadastrado">20/06/2021</td>
									<td data-label="#">
										<button
											className="action"
											style={{ backgroundColor: "#3583f6" }}
										>
											<FiSearch color="#fff" size={17} />
										</button>
										<button
											className="action"
											style={{ backgroundColor: "#f6a935" }}
										>
											<FiEdit2 color="#fff" size={17} />
										</button>
									</td>
								</tr>
							</tbody>
						</table>
					</>
				)}
			</div>
		</div>
	);
}
