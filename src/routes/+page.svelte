<script lang="ts">
	let quality: number = 25;
	let speed: number = 50;
	let pressedKey: string = '';

	function updateQuality() {
		// get the value of the slider
		const qualitySlider = document.getElementById('qualitySlider') as HTMLInputElement;
		quality = parseInt(qualitySlider.value);
		// console.log("Updating quality to " + quality);

		sendData();
	}
	function updateSpeed() {
		// get the value of the slider
		const speedSlider = document.getElementById('speedSlider') as HTMLInputElement;
		speed = parseInt(speedSlider.value);
		// console.log("Updating speed to " + speed);

		sendData();
	}

	function handleKeyDown(event: KeyboardEvent) {
		if (pressedKey === event.key) {
			return;
		}

		pressedKey = event.key;

		sendData();
	}

	function handleKeyUp() {
		pressedKey = '';

		sendData();
	}

	function sendData() {
		const data = {
			keys: pressedKey,
			speed: speed,
			quality: quality
		};
		// console.log(data);

		// send data to the server
		fetch('http://192.168.1.16:5000/data', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
				// disable cors
				// 'Access-Control-Allow-Origin': '*'
			},
			body: JSON.stringify(data)
		})
			// get the size of the entire
			.catch((error) => {
				console.error('Error:', error);
			});
	}
</script>

<svelte:window on:keydown={handleKeyDown} on:keyup={handleKeyUp} />

<div class="Hero">
	<div>
		<h1>MY RC CAR FROM EVERYWHERE</h1>
		<img src={'http://192.168.1.16:5000'} alt="Live stream of the RC car" />
	</div>
	<div class="bar">
		{#if pressedKey !== ''}
			<p>Current key: {pressedKey}</p>
		{:else}
			<p>Press a key</p>
		{/if}
		<label for="speedSlider">Speed: {speed}</label>
		<!-- on drag call updateSpeed function -->
		<input type="range" min="1" max="100" value="50" id="speedSlider" on:input={updateSpeed} />
		<label for="qualitySlider">Quality: {quality}</label>
		<!-- on drag call updateQuality function -->
		<input type="range" min="1" max="90" value="25" id="qualitySlider" on:input={updateQuality} />
	</div>
</div>
