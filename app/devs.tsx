import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import { useProdutoContext } from "../context/produtos-context";

export default function DevsScreen() {
    const developers = [
        {
            name: "Matheus Esteves",
            rm: "554769",
            imageUrl: "https://github.com/matheus-esteves10.png",
        },
        {
            name: "Gabriel Falanga",
            rm: "555061",
            imageUrl: "https://github.com/gabrielfalanga.png",
        },
        {
            name: "Arthur Spedine",
            rm: "554489",
            imageUrl: "https://github.com/arthurspedine.png",
        },
    ];

    const { } = useProdutoContext()

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text className="text-2xl font-medium mb-6">Desenvolvedores</Text>
            {developers.map((dev) => (
                <View key={dev.rm} className='items-center mb-5 bg-white p-4 rounded-lg shadow-lg w-full max-w-xs'>
                    <Image source={{ uri: dev.imageUrl }} className='w-20 h-20 rounded-full mb-4' />
                    <Text className='text-xl font-semibold text-gray-800 mb-2'>{dev.name}</Text>
                    <Text className='text-sm text-gray-600'>RM: {dev.rm}</Text>
                </View>
            ))}
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        padding: 20,
        backgroundColor: "#f9f9f9",
    },
});