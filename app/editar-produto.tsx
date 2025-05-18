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
import { Picker } from "@react-native-picker/picker";
import { ProdutoType } from "../types";

const estados: string[] = [
    "Acre", "Alagoas", "Amapá", "Amazonas", "Bahia", "Ceará",
    "Distrito Federal", "Espírito Santo", "Goiás", "Maranhão",
    "Mato Grosso", "Mato Grosso do Sul", "Minas Gerais", "Pará",
    "Paraíba", "Paraná", "Pernambuco", "Piauí", "Rio de Janeiro",
    "Rio Grande do Norte", "Rio Grande do Sul", "Rondônia", "Roraima",
    "Santa Catarina", "São Paulo", "Sergipe", "Tocantins"
];

export default function EditarProdutoScreen() {
    const { id } = useLocalSearchParams();
    const { produtos, editarProduto } = useProdutoContext();
    const router = useRouter();

    const produtoAtual = produtos.find((p) => p.id === id);

    const [form, setForm] = useState({
        id: "",
        nome: "",
        dataFabricacao: "",
        prazoValidade: "",
        quantidade: "",
        lote: "",
        codBarras: "",
        estado: "",
    });

    useEffect(() => {
        if (produtoAtual) {
            setForm({
                ...produtoAtual,
                quantidade: String(produtoAtual.quantidade),
            });
        }
    }, [produtoAtual]);

    const handleChange = (field: string, value: string) => {
        setForm({ ...form, [field]: value });
    };

    const salvarEdicao = () => {
        if (
            !form.nome ||
            !form.dataFabricacao ||
            !form.prazoValidade ||
            !form.quantidade ||
            !form.lote ||
            !form.codBarras ||
            !form.estado
        ) {
            Alert.alert("Erro", "Todos os campos são obrigatórios.");
            return;
        }

        const produtoEditado: ProdutoType = {
            ...form,
            quantidade: Number(form.quantidade),
        };

        editarProduto(produtoEditado);

        Alert.alert("Sucesso", "Produto editado com sucesso!");
        router.push("/");
    };

    return (
        <SafeAreaView style={styles.container}>
            <Text className="text-lg font-bold mb-4">Editar Produto</Text>
            <ScrollView>
                <Text className="text-base mb-2">Nome:</Text>
                <TextInput
                    style={styles.input}
                    value={form.nome}
                    onChangeText={(v) => handleChange("nome", v)}
                />

                <Text className="text-base mb-2">Data de Fabricação:</Text>
                <TextInputMask
                    style={styles.input}
                    value={form.dataFabricacao}
                    onChangeText={(v) => handleChange("dataFabricacao", v)}
                    type="datetime"
                    placeholder="dd/mm/aaaa"
                />

                <Text className="text-base mb-2">Prazo de Validade:</Text>
                <TextInputMask
                    style={styles.input}
                    value={form.prazoValidade}
                    onChangeText={(v) => handleChange("prazoValidade", v)}
                    type="datetime"
                    placeholder="dd/mm/aaaa"
                />

                <Text className="text-base mb-2">Quantidade:</Text>
                <TextInputMask
                    style={styles.input}
                    value={form.quantidade}
                    onChangeText={(v) => handleChange("quantidade", v)}
                    type="only-numbers"
                />

                <Text className="text-base mb-2">Lote:</Text>
                <TextInput
                    style={styles.input}
                    value={form.lote}
                    onChangeText={(v) => handleChange("lote", v)}
                />

                <Text className="text-base mb-2">Código de Barras:</Text>
                <TextInput
                    style={styles.input}
                    value={form.codBarras}
                    onChangeText={(v) => handleChange("codBarras", v)}
                />

                <Text className="text-base mb-2">Estado:</Text>
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
                </View>

                <TouchableOpacity
                    className="bg-blue-600 rounded-xl py-3"
                    onPress={salvarEdicao}
                >
                    <Text className="text-white text-center font-semibold">
                        Salvar Alterações
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
    input: {
        borderWidth: 1,
        borderRadius: 15,
        borderColor: "#ccc",
        paddingLeft: 10,
        marginBottom: 6,
        backgroundColor: "#fff",
    },
});
