module.exports = function () {
    this.running = false;
    this.vc = false;

    this.infoRunning = () => this.running;
    
    this.setRunning = (boo) => this.running = boo;
    
    this.infoVoice = () => this.vc;
    
    this.setVoice = (boo) => this.vc = boo;
    
}