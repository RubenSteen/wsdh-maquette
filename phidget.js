class Phidget {
    constructor(serial, channel) {
      this.serial = serial;
      this.channel = channel;
      this.digitalOutput = new phidget22.DigitalOutput();
      this.digitalOutput.setDeviceSerialNumber(this.serial);
      this.digitalOutput.setChannel(this.channel);
      this.digitalOutput.open(5000).catch(function (err) {
        console.error("Error during open:", err);
      });
      this.open = true;
      this.activated = false;
    }
  
    activate() {
      if (this.open) {
        this.digitalOutput.setDutyCycle(1).catch(function (err) {
          console.error("Error during open:", err);
        });
        this.activated = true;
        return true;
      }
      return false;
    }
  
    deactivate() {
      if (this.open) {
        this.digitalOutput.setDutyCycle(0).catch(function (err) {
          console.error("Error during open:", err);
        });
        this.activated = false;
        return true;
      }
      return false;
    }
  
    close() {
      this.digitalOutput.close();
      this.open = false;
      return true;
    }
  
    getSerial() {
      return this.serial;
    }
  
    getChannel() {
      return this.channel;
    }
  
    isActivated() {
      return this.activated;
    }
  
    isOpen() {
      return this.open;
    }

    test() {
        return boom;
      }
}

  module.exports = Phidget // 👈 Export class