import { CameraCapturedPicture, CameraView, useCameraPermissions } from 'expo-camera';
import * as MediaLibrary from 'expo-media-library';
import { useRouter } from 'expo-router';
import React, { useEffect, useRef, useState } from 'react';
import {
    Button,
    Image,
    StyleSheet,
    Text,
    View
} from 'react-native';

export default function Scanner() {
    const [permissaoCam, requestPermissaoCam] = useCameraPermissions();
    const [permissaoMedia, requestPermissaoMedia] = MediaLibrary.usePermissions();
    const cameraRef = useRef<CameraView>(null);
    const [foto, setFoto] = useState<CameraCapturedPicture | null>(null);
    const [isFrontCamera, setIsFrontCamera] = useState(false);
    const [flashLigado, setFlashLigado] = useState(false);
    const [scaneado, setScaneado] = useState(false);
    const router = useRouter();

    useEffect(() => {
        if (permissaoMedia === null) return;
        if (!permissaoMedia?.granted) {
            requestPermissaoMedia();
        }
    }, []);


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
            {!foto ? (
                <>
                    <CameraView
                        ref={cameraRef}
                        style={styles.camera}
                        facing={isFrontCamera ? 'front' : 'back'}
                        flash={flashLigado ? 'on' : 'off'}
                        // VOLTAR PARA CADASTRO QUANDO ESCANEADO
                        onBarcodeScanned={({ type, data }) => {
                            if (!scaneado) {
                                setScaneado(true);
                                router.replace({
                                    pathname: '/cadastro-produto',
                                    params: { scannedCode: data },
                                });
                            }
                        }}
                    />
                    <Button title="Alterar câmera" onPress={() => setIsFrontCamera(!isFrontCamera)} />
                    <Button
                        title={flashLigado ? 'Desligar Flash' : 'Ligar Flash'}
                        onPress={() => setFlashLigado(!flashLigado)}
                    />
                </>
            ) : (
                <>
                    <Image source={{ uri: foto.uri }} style={styles.preview} />
                </>
            )}
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
        justifyContent: 'center',
        alignItems: 'center',
    },
});
