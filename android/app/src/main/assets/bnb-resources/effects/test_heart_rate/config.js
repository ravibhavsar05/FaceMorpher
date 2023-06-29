bnb.scene.enableRecognizerFeature(bnb.FeatureID.PULSE);

let txtField = bnb.scene.getAssetManager().findImage("text");

bnb.eventListener.on("onUpdate", ()=> {

  

    if (bnb.heartRateMonitor.getDetectionProgress() < 100) {
        txtField.asTextTexture().setText("heart rate calculation: " + bnb.heartRateMonitor.getDetectionProgress() + " %");
    } else {
        txtField.asTextTexture().setText("heart rate: " + bnb.heartRateMonitor.getPulse().toFixed(1)  + " bpm");
    }

   
})