import { Ionicons } from "@expo/vector-icons";
import React from 'react';
import { Alert, FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";
import { useProdutoContext } from "../context/produtos-context";

export default function HomeScreen() {

  const { produtos, removerProduto } = useProdutoContext();

  const confirmarExclusao = (id: string) => {
    Alert.alert(
      'Excluir Produto',
      'Tem certeza que deseja excluir este produto?',
      [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'Excluir', style: 'destructive', onPress: () => removerProduto(id) },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text className="text-2xl font-bold mb-4">Lista de Produtos</Text>
      <FlatList
        data={produtos}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View className="bg-gray-100 p-4 rounded-2xl mb-4 flex-row justify-between items-start shadow-sm border-b">
            <View className="flex-1">
              <Text className="font-bold text-lg mb-1">{item.nome}</Text>
              <Text className="text-sm text-gray-700">ID: {item.id}</Text>
              <Text className="text-sm text-gray-700">Fabricação: {item.dataFabricacao}</Text>
              <Text className="text-sm text-gray-700">Validade: {item.prazoValidade}</Text>
              <Text className="text-sm text-gray-700">Quantidade: {item.quantidade}</Text>
              <Text className="text-sm text-gray-700">Lote: {item.lote}</Text>
              <Text className="text-sm text-gray-700">Código de Barras: {item.codBarras}</Text>
              <Text className="text-sm text-gray-700">Estado: {item.estado}</Text>
            </View>
            <TouchableOpacity
              onPress={() => confirmarExclusao(item.id)}
              className="ml-3 mt-1"
            >
              <Ionicons name="trash" size={24} color="red" />
            </TouchableOpacity>
          </View>)
        }
        ListEmptyComponent={
          <Text className="text-center mt-6 text-gray-500 text-xl">
            Nenhum produto cadastrado.
          </Text>
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
});
