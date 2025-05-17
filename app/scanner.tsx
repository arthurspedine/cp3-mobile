import { CameraView, useCameraPermissions } from "expo-camera";
import { useFocusEffect, useRouter } from "expo-router";
import React, { useCallback, useRef, useState } from "react";
import { Button, StyleSheet, Text, View } from "react-native";

export default function Scanner() {
	const [permissaoCam, requestPermissaoCam] = useCameraPermissions();
	const cameraRef = useRef<CameraView>(null);
	const [isFrontCamera, setIsFrontCamera] = useState(false);
	const [cameraKey, setCameraKey] = useState(0);
	const router = useRouter();

	useFocusEffect(
		useCallback(() => {
			setCameraKey((prev) => prev + 1);
		}, []),
	);

	if (!permissaoCam) return <View />;
	if (!permissaoCam.granted) {
		return (
			<View style={styles.container}>
				<Text>Permissão da câmera não foi concedida</Text>
				<Button title="Permitir" onPress={requestPermissaoCam} />
			</View>
		);
	}

	return (
		<View style={styles.container}>
			<CameraView
				key={cameraKey}
				ref={cameraRef}
				style={styles.camera}
				facing={isFrontCamera ? "front" : "back"}
				// VOLTAR PARA CADASTRO QUANDO ESCANEADO
				onBarcodeScanned={({ type, data }) => {
					router.replace({
						pathname: "/cadastro-produto",
						params: { scannedCode: data },
					});
				}}
			/>
			<Button
				title="Alterar câmera"
				onPress={() => setIsFrontCamera(!isFrontCamera)}
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	camera: {
		flex: 1,
	},
	preview: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
});
