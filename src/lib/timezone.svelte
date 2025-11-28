<script lang="ts">
	const formatter = new Intl.DateTimeFormat('en-UK', {
		timeZone: 'Europe/London',
		timeZoneName: 'short'
	});

	const getTimezone = () => {
		const parts = formatter.formatToParts(new Date());
		const timezone = parts.find(({ type }) => type === 'timeZoneName');

		return timezone ? timezone.value : 'GMT';
	};

	let timezone: string | null = $state(null);

	$effect(() => {
		let timeout: ReturnType<typeof setTimeout>;

		function updateTime() {
			timeout = setTimeout(updateTime, 1000 - new Date().getMilliseconds());
			timezone = getTimezone();
		}

		updateTime();

		return () => clearTimeout(timeout);
	});
</script>

{timezone ?? ''}
