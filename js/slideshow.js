var slideImgList = document.querySelectorAll(".ban-cast .slide-list .slide-item");
//console.log(slideImgList);

var slideCircle = document.querySelectorAll(".ban-cast .circle-box .circle");
//console.log(slideCircle);

let nSlide = 1;

var slideMove = function() {
	//  console.log("before: " + nSlide);
	if(nSlide > 7) {
		nSlide = 0;
	}
	slideImgList.forEach(function(val, index) {
		val.classList.remove("active");
		slideCircle[index].classList.remove("active");
	});
	slideImgList[nSlide].classList.add("active");
	slideCircle[nSlide].classList.add("active");
	nSlide++;
	//  console.log("after: " + nSlide);
};

var slideTimer = setInterval(slideMove, 2000);

var slideBox = document.querySelector(".ban-cast");
//console.log(slideBox);

slideBox.onmouseover = function() {
	//  console.log("now: " + nSlide);
	clearInterval(slideTimer);
};

slideBox.onmouseout = function() {
	slideTimer = setInterval(slideMove, 2000);
};

slideCircle.forEach(function(val, index) {
	val.onmouseenter = function() {
		slideCircle.forEach(function(val, index) {
			val.classList.remove("active");
			slideImgList[index].classList.remove("active");
		});
		this.classList.add("active");
		slideImgList[index].classList.add("active");
		if(nSlide > 7) {
			nSlide = 0;
		} else {
			nSlide = index + 1;
		}
	}
});

var slideLeft = document.querySelector(".ban-cast .slide-left");
//console.log(slideLeft);
var slideRight = document.querySelector(".ban-cast .slide-right");
//console.log(slideRight);

slideLeft.onclick = function() {
	//  console.log(nSlide);
	if(nSlide > 1) {
		nSlide -= 2;
	} else {
		nSlide = 7;
	}
	slideImgList.forEach(function(val, index) {
		val.classList.remove("active");
		slideCircle[index].classList.remove("active");
	});
	slideImgList[nSlide].classList.add("active");
	slideCircle[nSlide].classList.add("active");

	nSlide++;
};

slideRight.onclick = function() {
	if(nSlide > 7) {
		nSlide = 0;
	}

	slideImgList.forEach(function(val, index) {
		val.classList.remove("active");
		slideCircle[index].classList.remove("active");
	});
	slideImgList[nSlide].classList.add("active");
	slideCircle[nSlide].classList.add("active");

	nSlide++;
};














carousel(".box1-mid", true, 3000);
carousel(".mi-left", true, 3000);
carousel(".spike .spike-right .carousel1", false);
carousel(".box1-right .box-con", false);
carousel(".spike-right .carousel2", true, 3000);

function carousel(selector, auto = true, timeStep = 2000) {
	let moveBox = document.querySelector(selector +  " .move-box");
	console.log(moveBox);
	let moveLeft = document.querySelector(selector + " .move-left");
	let moveRight = document.querySelector(selector + " .move-right");
	console.log(moveLeft);
	console.log(moveRight);
	let moveCircle = document.querySelectorAll(selector + " .move-circle");
	console.log(moveCircle);

	let moveNext = 2;

	let moveFlag = true;

//	let moveStep = 350;
	let moveStep = moveBox.offsetWidth / (moveCircle.length + 2);

	function moveFunc() {
		moveBox.style.transition = "all .5s";
		moveBox.style.left = (-moveNext * moveStep) + "px";
		moveCircle.forEach(function(val, index) {
			val.classList.remove("active");
		})
		if(moveNext == moveCircle.length + 1) {
			moveCircle[0].classList.add("active");
		} else if(moveNext == 0) {
			moveCircle[moveCircle.length - 1].classList.add("active");
		} else {
			moveCircle[moveNext - 1].classList.add("active");
		}
		moveNext++;
	}
	if(auto){
		let moveTimer = setInterval(function() {
			if(moveFlag) {
				moveFlag = false;
				moveFunc();
			}
		}, timeStep);
	}

	moveBox.addEventListener("transitionend", function() {
		if(moveBox.style.left == (-(moveCircle.length + 1) * moveStep) + "px") {
			moveNext = 2;
			moveBox.style.transition = "all 0s";
			moveBox.style.left = -moveStep + "px";
		}
		if(moveBox.style.left == "0px") {
			moveNext = moveCircle.length + 1;
			moveBox.style.transition = "all 0s";
			moveBox.style.left = (-moveCircle.length * moveStep) + "px";
		}
		moveFlag = true;
	});

	moveCircle.forEach(function(val, index) {
		val.onmouseenter = function() {
			moveBox.style.transition = "all .5s";
			moveCircle.forEach(function(val, index) {
				val.classList.remove("active");
			})
			val.classList.add("active");
			moveBox.style.left = -(index + 1) * moveStep + "px";
			moveNext = index + 2;
		}
	})

	moveRight.onclick = function() {
		if(moveFlag) {
			moveFlag = false;
			moveFunc();
		}
	}

	moveLeft.onclick = function() {
		if(moveFlag) {
			moveFlag = false;
			moveNext -= 2;
			moveFunc();
		}
	}

}





let tabSwitch = document.querySelectorAll(".box1-left .box-con .tab .tab-link");
//console.log(tabSwitch);
let tabSwitchBox = document.querySelectorAll(".box1-left .box-con .tab-switch");
//console.log(tabSwitchBox);

tabSwitch.forEach(function(value, index){
	value.onmouseenter = function(){
		tabSwitch.forEach(function(value, index){
			value.classList.remove("active");
			tabSwitchBox[index].classList.remove("switch-active");
		})
		value.classList.add("active");
		tabSwitchBox[index].classList.add("switch-active");
	}
})

//carousel(".box1-left .box-con .tab-switch1", false);
//carousel(".box1-left .box-con .tab-switch2");

let tabSwitchClass = ".box1-left .box-con .tab-switch";

for(let i = 1; i <= tabSwitch.length; i ++){
	carousel(tabSwitchClass + i, false);
}
