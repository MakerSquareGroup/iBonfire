iBonfire

1. Go to our organization and the repo within it ( https://github.com/DiversityLLC/iBonfire ) and go to the DEV BRANCH ( REMEMBER ALL WORK IS DONE IN THE DEV BRANCH )

**********************************************************************************************************

DO THESE STEPS ONLY ONCE

	2. Fork DEV BRANCH to your account and clone down to your local machine.
	3. Create an upstream remote:
		git remote add upstream https://github.com/DiversityLLC/iBonfire.git
	4. Checkout the dev branch: 
		git checkout -b dev origin/dev

**********************************************************************************************************

5. Rebase on local: 
	git pull --rebase upstream dev

6. Create a featureBranch and checkout to type/featureBranch:
	git checkout -b type/featureBranch

7. Develop!

8. Then add your files and commit, REFER TO COMMIT STYLE GUIDE ON THE NEXT PAGE:
	git add .
	git commit -m "..."

9. REBASE AGAIN:
	git pull --rebase upstream dev

10. Deal with merge conflicts, then push to origin type/featureBranch:
	git push origin type/featureBranch

11. Slack scrum master before opening pull request from yourAccount/repo:type/featureBranch to org/repo:dev




COMMIT STYLE GUIDE

1. Commit Messages are Vital!

2. Maintain uniform commit style, uppercase on the first letter of a commit type and the commit message.

3. Make sure Tab Size on all files is set to 2.

KEYWORDS:
	[Pull] - Progress on specific feature (should be from featureBranch) has been made
	[Feature] - Implementation of specific feature (should be from featureBranch) is complete
	[Fix] - Made something broken working, like a bug or something
	[Style] - Styling changes
	[Setup] - Changes to readme, gitignore, package.json, webpack
	[Refactor] - Code does the same thing but it is better code

Examples:
	[Pull] Makes progress on itemform and wishlist rendering
	[Feature] Finishes basic signup component
	[Fix] Fixes succesful ajax call landing in error
	[Style] Implements category image buttons
	[Setup] Sets up basic routing template
	[Refactor] Refactors base components to es6 and sets preloaders