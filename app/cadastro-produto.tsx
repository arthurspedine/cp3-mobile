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
import { TextInputMask } from 'react-native-masked-text';
import { SafeAreaView } from "react-native-safe-area-context";
import { useProdutoContext } from "../context/produtos-context";
import { ProdutoType } from "../types";

const estados = ['SP', 'RJ', 'MG', 'RS', 'PR'];

export default function CadastroProdutoScreen() {
    const { scannedCode } = useLocalSearchParams();

    const { adicionarProduto } = useProdutoContext();
    const router = useRouter();

    const [form, setForm] = useState({
        nome: '',
        dataFabricacao: '',
        prazoValidade: '',
        quantidade: '',
        lote: '',
        codBarras: '',
        estado: '',
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
            Alert.alert('Oops!', 'Preencha todos os campos!', [{ text: "OK" }],
                { cancelable: false });
            return;
        }

        const novoProduto: ProdutoType = {
            id: '',
            ...form,
            quantidade: Number(form.quantidade),
        };

        adicionarProduto(novoProduto);
        Alert.alert('Sucesso', 'Produto cadastrado com sucesso!');
        router.push('/')
    }


    return (
        <SafeAreaView style={styles.container}>
            <ScrollView>
                <Text className="text-lg font-bold mb-4">Cadastro de Produto</Text>


                <Text className="text-base mb-2">Nome:</Text>
                <TextInput
                    style={styles.input}
                    value={form.nome}
                    onChangeText={(v) => handleChange('nome', v)}
                    placeholder="Ex: Moto Honda CG 160"
                />

                <Text className="text-base mb-2">Data de Fabricação:</Text>
                <TextInputMask
                    style={styles.input}
                    value={form.dataFabricacao}
                    onChangeText={(value) => handleChange('dataFabricacao', value)}
                    type="datetime"
                    placeholder="dd/mm/aaaa"
                />

                <Text className="text-base mb-2">Prazo de Validade:</Text>
                <TextInputMask
                    style={styles.input}
                    value={form.prazoValidade}
                    onChangeText={(value) => handleChange('prazoValidade', value)}
                    placeholder="dd/mm/aaaa"
                    type="datetime"
                />

                <Text className="text-base mb-2">Quantidade:</Text>
                <TextInputMask
                    style={styles.input}
                    value={form.quantidade}
                    onChangeText={(v) => handleChange('quantidade', v)}
                    type="only-numbers"
                    placeholder="Ex: 10"
                />

                <Text className="text-base mb-2">Lote:</Text>
                <TextInput
                    style={styles.input}
                    value={form.lote}
                    onChangeText={(v) => handleChange('lote', v)}
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
                        <Text className="text-white font-medium">Ler QR</Text>
                    </TouchableOpacity>
                </View>

                <Text className="text-base mb-2">Estado:</Text>
                <View className="border border-gray-300 rounded-xl mb-6">
                    {estados.map((estado) => (
                        <TouchableOpacity
                            key={estado}
                            className={`px-3 py-2 ${form.estado === estado ? 'bg-green-100' : ''}`}
                            onPress={() => handleChange('estado', estado)}
                        >
                            <Text>{estado}</Text>
                        </TouchableOpacity>
                    ))}
                </View>
            </ScrollView>

            <TouchableOpacity
                className="bg-green-600 rounded-xl py-3"
                onPress={cadastrar}
            >
                <Text className="text-white text-center font-semibold">Salvar Produto</Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f9f9f9',
        paddingHorizontal: 20,
        paddingTop: 40,
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
        backgroundColor: "#fff"
    },
});