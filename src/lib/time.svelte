<script lang="ts">
	const getTime = () => {
		return new Date().toLocaleString('en-UK', {
			timeZone: 'Europe/London',
			hour: '2-digit',
			minute: '2-digit',
			hour12: false
		});
	};

	let time: string | null = $state(null);

	$effect(() => {
		let timeout: ReturnType<typeof setTimeout>;

		function updateTime() {
			timeout = setTimeout(updateTime, 1000 - new Date().getMilliseconds());
			time = getTime();
		}

		updateTime();

		return () => clearTimeout(timeout);
	});
</script>

{time ?? ''}
