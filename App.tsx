import React, {useEffect, useRef, useState} from 'react';
import {SafeAreaView, StyleSheet, View, Image, Text} from 'react-native';
import BanubaSdkManager, {EffectPlayerView} from '@banuba/react-native';
import Slider from '@react-native-community/slider';

function App() {
  let playerRef: any = useRef(null);
  const [nose, setNose] = useState(0);
  const [face, setFace] = useState(0);
  const [eyes, setEyes] = useState(0);

  useEffect(() => {
    BanubaSdkManager?.initialize(
      [],
      'Please enter your banuba sdk react native key'
    );

    console.log(playerRef);

    BanubaSdkManager?.attachView(playerRef.current._nativeTag);
    BanubaSdkManager?.openCamera();
    BanubaSdkManager?.startPlayer();
    BanubaSdkManager?.loadEffect('effects/Makeup');

    return () => {
      BanubaSdkManager.stopPlayer();
    };
  }, []);

  const updateFaceValue = () => {
    BanubaSdkManager.evalJs(`FaceMorph.face(${face})`);
    
  };
  const updateNoseValue = () => {
    BanubaSdkManager.evalJs(`FaceMorph.nose(${nose})`);
  };
  const updateEyesValue = () => {
    BanubaSdkManager.evalJs(`FaceMorph.eyes(${eyes})`);
  };
  console.log('eyes', eyes, face, nose);

  return (
    <View style={styles.container}>
    <EffectPlayerView style={{flex: 1}} ref={playerRef} />
    <View
      style={{
        flex: 1,
        width: '100%',
        flexDirection: 'column',
        position: 'absolute',
        bottom: 10,
      }}>
      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          padding: '2%',
          marginRight: '10%',
        }}>
        <Image
          style={{width: 40, height: 40}}
          source={require('./images/face.png')}
        />

        <Slider
          style={{width: '100%', height: 40}}
          minimumValue={1}
          maximumValue={5}
          onValueChange={(value: number) => {
            setFace(value);
            updateFaceValue();
          }}
          minimumTrackTintColor="#FFFFFF"
          maximumTrackTintColor="#000000"
        />
      </View>
      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          padding: '2%',
          marginRight: '10%',
        }}>
        <Image
          style={{width: 40, height: 40}}
          source={require('./images/nose.png')}
        />
        <Slider
          style={{width: '100%', height: 40}}
          minimumValue={1}
          maximumValue={5}
          onValueChange={(value: number) => {
            updateNoseValue();
            setNose(value);
          }}
          minimumTrackTintColor="#FFFFFF"
          maximumTrackTintColor="#000000"
        />
      </View>
      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          padding: '2%',
          marginRight: '10%',
        }}>
        <Image
          style={{width: 40, height: 40}}
          source={require('./images/eye.png')}
        />

        <Slider
          style={{width: '100%', height: 40}}
          minimumValue={1}
          maximumValue={5}
          onValueChange={(value: number) => {
            updateEyesValue();
            setEyes(value);
          }}
          minimumTrackTintColor="#FFFFFF"
          maximumTrackTintColor="#000000"
        />
      </View>
    </View>
  </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  preview: {
    flex: 1,
  },
  actionButton: {
    position: 'absolute',
    bottom: 25,
    padding: 16,
    right: 20,
    left: 20,
    borderRadius: 20,
    alignItems: 'center',
  },
});

export default App;
