(function (w, d) {
  "use strict";

  class Drone {
    constructor(elem) {
      this.elem = elem;
      this.perspectiveElem = elem.querySelector(".drone-inner");

      this.increment = 6;
      this.maxSpeed = 12;
      this.tiltDegree = 30;

      this.x = elem.offsetLeft;
      this.y = elem.offsetTop;
      this.vx = 0;
      this.vy = 0;
      this.ax = 0;
      this.ay = 0;
      this.z = 0;

      this.movingX = false;
      this.movingY = false;

      w.addEventListener("keydown", (e) => this.handleKeydown(e.keyCode));
      w.addEventListener("keyup", (e) => this.handleKeyup(e.keyCode));

      this.move();
    }

    handleKeydown(keyCode) {
      switch (keyCode) {
        case 38: //up
          this.ay = -this.increment;
          this.movingY = true;
          break;
        case 40: //down
          this.ay = this.increment;
          this.movingY = true;
          break;
        case 37: //left
          this.ax = -this.increment;
          this.movingX = true;
          break;
        case 39: //right
          this.ax = this.increment;
          this.movingX = true;
          break;
      }
    }

    handleKeyup(keyCode) {
      switch (keyCode) {
        case 38: //up
        case 40: //down
          this.movingY = false;
          break;
        case 37: //left
        case 39: //right
          this.movingX = false;
          break;
      }
    }

    move() {
      this.vx += this.ax;
      this.vy += this.ay;
      if (this.vx > this.maxSpeed) this.vx = this.maxSpeed;
      else if (this.vx < -this.maxSpeed) this.vx = -this.maxSpeed;
      if (this.vy > this.maxSpeed) this.vy = this.maxSpeed;
      else if (this.vy < -this.maxSpeed) this.vy = -this.maxSpeed;

      this.x += this.vx;
      this.y += this.vy;
      if (this.x < 20) this.x = 20;
      if (this.y < 100) this.y = 100;
      if (this.x > window.innerWidth - 250) this.x = window.innerWidth - 250;
      if (this.y > window.innerHeight - 250) this.y = window.innerHeight - 250;

      if (!this.movingX) {
        if (this.ax > 0) --this.ax;
        else if (this.ax < 0) ++this.ax;
      }
      if (!this.movingY) {
        if (this.ay > 0) --this.ay;
        else if (this.ay < 0) ++this.ay;
      }

      if (this.vx > 0) --this.vx;
      else if (this.vx < 0) ++this.vx;
      if (this.vy > 0) --this.vy;
      else if (this.vy < 0) ++this.vy;

      this.elem.style.left = [this.x, "px"].join("");
      this.elem.style.top = [this.y, "px"].join("");

      this.perspectiveElem.style.transform = `rotateY(${
        this.tiltDegree * (this.vx / this.maxSpeed)
      }deg) rotateX(${-1 * this.tiltDegree * (this.vy / this.maxSpeed)}deg)`;

      w.requestAnimationFrame((e) => this.move());
    }
  }

  const drone = new Drone(d.querySelector(".drone"));
})(window, document);
