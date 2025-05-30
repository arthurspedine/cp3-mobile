import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router/tabs";
import { ProdutoProvider } from "../context/produtos-context";
import '../global.css';

export default function Layout() {
    return (
        <ProdutoProvider>
            <Tabs screenOptions={{ tabBarActiveTintColor: '#08A4C0FF', headerShown: false }}>
                <Tabs.Screen
                    name="index"
                    options={{
                        title: 'Home',
                        tabBarIcon: ({ color, size, focused }) => (
                            <Ionicons name={focused ? 'home' : 'home-outline'} size={size} color={color} />
                        ),
                    }}
                />
                <Tabs.Screen
                    name="cadastro-produto"
                    options={{
                        title: 'Cadastrar',
                        tabBarIcon: ({ color, size, focused }) => (
                            <Ionicons name={focused ? 'add-circle' : 'add-circle-outline'} size={size} color={color} />
                        ),
                    }}
                />
                <Tabs.Screen
                    name="devs"
                    options={{
                        title: 'Developers',
                        tabBarIcon: ({ color, size, focused }) => (
                            <Ionicons name={focused ? 'people' : 'people-outline'} size={size} color={color} />
                        ),
                    }}
                />
                <Tabs.Screen
                    name="scanner"
                    options={{
                        title: 'Scanner Código',
                        tabBarButton: () => null, // Remove a aba da navegação
                    }}
                />
                <Tabs.Screen
                    name="editar-produto"
                    options={{
                        title: 'Editar',
                        tabBarButton: () => null, // Remove a aba da navegação
                    }}
                />
            </Tabs>
        </ProdutoProvider>
    );
}
