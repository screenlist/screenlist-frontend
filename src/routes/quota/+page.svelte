<script>
	export let data
</script>

<div class="content-page">
	<article class="content-wrap">
		<h1>Quota</h1>
		<span class="just-bold">You have used {data.quota.usage}% of your quota in the past 24 hours.</span>
		<div class="content-body">
			<h2 class="h4">What is quota?</h2>
			<p>
				This is your given 24 hour content contribution quota. It only applies to accounts that are 
				not reviewed. To keep the platform as free of malicious fake content as possible, it is 
				necessary to moderate what users create, edit or remove. However, content moderation is a 
				lot of work for a small project like this one and measures are needed to reduce this burden, the 
				quota system is one such measure.
			</p>
			<h2 class="h4">How does it work?</h2>
			<p>
				Within a given 24 hour interval, user accounts that are not approved can only contribute up to 15 times. 
				This system resets automatically as time move on.
			</p>
			<h2 class="h4">How to get approved?</h2>
			<p>
				The process of approving an account is used to make sure the people who contribute are real and have the 
				best intentions with their contributions. Every piece of editing that is made to the content on this platform 
				is monitored and moderated. For now the only way to catch the attention of the monitors and moderators is 
				to be a good faith contributor. Good faith contributors usually will have a high Reputation <a href="/content/contributions" class="link">(read the reputation section for more information)</a>. 
				Contributors with high reputations will be invited to go through the verification process if they wish. After 
				verification, quotas no longer apply but Reputation may apply.
			</p>
		</div>
	</article>
</div>