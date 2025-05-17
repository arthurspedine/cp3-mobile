import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
	Alert,
	ScrollView,
	StyleSheet,
	Text,
	TextInput,
	TouchableOpacity,
	View,
} from "react-native";
import { TextInputMask } from "react-native-masked-text";
import { SafeAreaView } from "react-native-safe-area-context";
import { useProdutoContext } from "../context/produtos-context";
import type { ProdutoType } from "../types";
import { Picker } from "@react-native-picker/picker";

const estados: string[] = [
	"Acre",
	"Alagoas",
	"Amapá",
	"Amazonas",
	"Bahia",
	"Ceará",
	"Distrito Federal",
	"Espírito Santo",
	"Goiás",
	"Maranhão",
	"Mato Grosso",
	"Mato Grosso do Sul",
	"Minas Gerais",
	"Pará",
	"Paraíba",
	"Paraná",
	"Pernambuco",
	"Piauí",
	"Rio de Janeiro",
	"Rio Grande do Norte",
	"Rio Grande do Sul",
	"Rondônia",
	"Roraima",
	"Santa Catarina",
	"São Paulo",
	"Sergipe",
	"Tocantins",
];

export default function CadastroProdutoScreen() {
	const { scannedCode } = useLocalSearchParams();

	const { adicionarProduto } = useProdutoContext();
	const router = useRouter();

	const [form, setForm] = useState({
		nome: "",
		dataFabricacao: "",
		prazoValidade: "",
		quantidade: "",
		lote: "",
		codBarras: "",
		estado: "",
	});

	const handleChange = (field: string, value: string) => {
		setForm({ ...form, [field]: value });
	};

	useEffect(() => {
		if (scannedCode) {
			setForm((prev) => ({ ...prev, codBarras: String(scannedCode) }));
		}
	}, [scannedCode]);

	const cadastrar = () => {
		// se tiver algum campo vazio
		if (
			!form.nome ||
			!form.dataFabricacao ||
			!form.prazoValidade ||
			!form.quantidade ||
			!form.lote ||
			!form.codBarras ||
			!form.estado
		) {
			Alert.alert("Oops!", "Preencha todos os campos!", [{ text: "OK" }], {
				cancelable: false,
			});
			return;
		}

		const novoProduto: ProdutoType = {
			id: "",
			...form,
			quantidade: Number(form.quantidade),
		};

		adicionarProduto(novoProduto);
		Alert.alert("Sucesso", "Produto cadastrado com sucesso!");
		// Limpa o formulário
		setForm({
			nome: "",
			dataFabricacao: "",
			prazoValidade: "",
			quantidade: "",
			lote: "",
			codBarras: "",
			estado: "",
		});
		router.push("/");
	};

	return (
		<SafeAreaView style={styles.container}>
			<Text className="text-lg font-bold mb-4">Cadastro de Produto</Text>
			<ScrollView>
				<Text className="text-base mb-2">Nome:</Text>
				<TextInput
					style={styles.input}
					value={form.nome}
					onChangeText={(v) => handleChange("nome", v)}
					placeholder="Ex: Caixa de Leite"
				/>

				<Text className="text-base mb-2">Data de Fabricação:</Text>
				<TextInputMask
					style={styles.input}
					value={form.dataFabricacao}
					onChangeText={(value) => handleChange("dataFabricacao", value)}
					type="datetime"
					placeholder="dd/mm/aaaa"
				/>

				<Text className="text-base mb-2">Prazo de Validade:</Text>
				<TextInputMask
					style={styles.input}
					value={form.prazoValidade}
					onChangeText={(value) => handleChange("prazoValidade", value)}
					placeholder="dd/mm/aaaa"
					type="datetime"
				/>

				<Text className="text-base mb-2">Quantidade:</Text>
				<TextInputMask
					style={styles.input}
					value={form.quantidade}
					onChangeText={(v) => handleChange("quantidade", v)}
					type="only-numbers"
					placeholder="Ex: 10"
				/>

				<Text className="text-base mb-2">Lote:</Text>
				<TextInput
					style={styles.input}
					value={form.lote}
					onChangeText={(v) => handleChange("lote", v)}
					placeholder="Ex: A123"
				/>

				<Text className="text-base mb-2">Código de Barras:</Text>
				<View className="mb-2 border border-gray-300 rounded-xl px-3 py-3 flex-row items-center justify-between">
					<Text className="text-base flex-1">
						{form.codBarras ? form.codBarras : "Nenhum código escaneado"}
					</Text>
					<TouchableOpacity
						onPress={() => router.push("/scanner")}
						className="ml-4 px-3 py-2 bg-green-500 rounded-md"
					>
						<Text className="text-white font-medium">Ler Código</Text>
					</TouchableOpacity>
				</View>

				<Text className="text-base mb-2">Selecione um estado:</Text>
				<View className="border border-gray-300 rounded-xl mb-6">
					<Picker
						selectedValue={form.estado}
						onValueChange={(value) => {
							handleChange("estado", value);
						}}
						dropdownIconColor="#000"
					>
						{estados.map((estado) => (
							<Picker.Item key={estado} label={estado} value={estado} />
						))}
					</Picker>
					<Text className="text-base text-center py-2 color-[#555]">
						Estado selecionado: {form.estado}
					</Text>
				</View>
				<TouchableOpacity
					className="bg-green-600 rounded-xl py-3"
					onPress={cadastrar}
				>
					<Text className="text-white text-center font-semibold">
						Salvar Produto
					</Text>
				</TouchableOpacity>
			</ScrollView>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#f9f9f9",
		paddingHorizontal: 20,
		paddingTop: 40,
		paddingBottom: 10,
	},
	header: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
		marginBottom: 20,
		gap: 25,
	},
	input: {
		borderWidth: 1,
		borderRadius: 15,
		borderColor: "#ccc",
		paddingLeft: 10,
		marginBottom: 6,
		backgroundColor: "#fff",
	},
});
