# Design Jeopardy: full answer key

Every question in `bank.js` with its right answer. Questions marked (picture), (animation), (video) or (sound) show or play something on screen. The game shuffles the A to D order each time it draws boards, so letters only appear in the in game answer key. Use this file to review or print the whole bank.

This file is generated. After editing `bank.js`, run `node tools/answer-key.mjs` to rebuild it.

## UX Laws

| Level | Question | Answer |
| --- | --- | --- |
| Easy | Big buttons placed close to your thumb are faster to hit than small ones far away. Which law describes this? | **Fitts's law** |
| Easy | A menu with 40 choices takes longer to decide on than a menu with 5. Which law describes this? | **Hick's law** |
| Medium | (picture) Shoppers on this store keep saying they can't find their bag. Which law explains why? | **Jakob's law** |
| Medium | (picture) A burrito app asks you to pick toppings from this screen. Which law explains why people take so long? | **Hick's law** |
| Medium | People expect your site to work like the other sites they already use. Which law is that? | **Jakob's law** |
| Medium | Miller's law is usually summed up as people holding about how many items in short term memory? | **Seven, plus or minus two** |
| Medium | (picture) People keep deleting their account by accident on this settings screen. Which law explains why? | **Fitts's law** |
| Medium | (picture) Which law explains why number 2 is easier to read back over the phone than number 1? | **Miller's law** |
| Hard | Every system has some complexity that can't be removed, only moved between the user and the system. Which law is that? | **Tesler's law** |
| Hard | A phone number field accepts spaces, dashes and parentheses and cleans them up itself. Which law is it following? | **Postel's law** |
| Hard | (picture) Type a ZIP code and this form fills in the city and state for you. Which law is the form following? | **Tesler's law** |
| Hardest | A city's website is organized by department instead of by what residents need. Which law predicts that? | **Conway's law** |
| Hardest | A team is rewarded for time on page, so they make pages harder to leave. Which law warns about this? | **Goodhart's law** |
| Hardest | The Doherty threshold says people stay engaged when a system responds within about how long? | **400 milliseconds** |

## Gestalt

| Level | Question | Answer |
| --- | --- | --- |
| Easy | (picture) Is the Password label for the first box or the second? Which principle is this form getting wrong? | **Proximity** |
| Easy | Every link on a page is blue and underlined, so you read them all as the same kind of thing. Which principle? | **Similarity** |
| Easy | (picture) The dots are evenly spaced, yet you see columns instead of rows. Which principle? | **Similarity** |
| Medium | (picture) In this food delivery app, what makes each photo, name and rating read as one restaurant? | **Common region** |
| Medium | (picture) Nobody drew a complete circle here, but you see two. Which principle? | **Closure** |
| Medium | (picture) You see two smooth lines crossing, not four short lines meeting in the middle. Which principle? | **Continuity** |
| Medium | (picture) Is it a vase or two faces? Which principle is this picture playing with? | **Figure and ground** |
| Hard | A modal dims everything behind it so the dialog stands out. Which principle is the dimming using? | **Figure and ground** |
| Hard | (picture) The line joining these delivery steps makes you read them as one sequence. Which principle? | **Uniform connectedness** |
| Hard | (animation) Watch the dots. Some move together, so they read as one group. Which principle? | **Common fate** |
| Hardest | People see a complex shape as the simplest form that could explain it. What is that principle called? | **Prägnanz** |
| Hardest | Gestalt principles come from which field? | **Psychology** |

## Design Decisions

| Level | Question | Answer |
| --- | --- | --- |
| Easy | Visitors must choose left or right at a corridor split. Where should direction information appear? | **Before they make the turn** |
| Easy | Customers cannot tell whether to order or pick up at a busy counter. What should the designer clarify? | **The two actions and where each happens** |
| Easy | A client requests a new app, but the error is in a printed appointment reminder. What should the proposal address first? | **The incorrect instructions people already receive** |
| Medium | A menu lists 30 services with equal prominence. What's a reasonable design decision? | **Group related services and prioritize common tasks** |
| Medium | A user-selected service is unavailable. What should the interface communicate next? | **What happened and which actions remain available** |
| Medium | (picture) This screen gives a discount banner, survey, referral link, and task button equal attention. What should guide the redesign? | **The person's main task and the information needed to complete it** |
| Hard | A service has many customers without smartphones. What should a proposed digital check-in include? | **A usable route for people who cannot use the app** |
| Hard | A small organization can change a reminder today but replace hallway signs next year. What should its proposal consider? | **The impact, cost, and timing of each change** |
| Hard | A customer needs different information at arrival and at checkout. What should determine where each detail appears? | **The decision being made at that moment** |
| Hardest | A client wants a new directory, but research shows visitors are sent to an old building name. What should you recommend? | **Align destination names across reminders, maps, and signs** |
| Hardest | A proposal benefits customers but doubles the steps employees must perform. What should the designer do? | **Show the tradeoff and investigate whether the new work is feasible** |
| Hardest | A client reads a one-page recommendation. Which sentence best demonstrates design judgment? | **Visitors miss the turn before the map; move the direction cue to the entrance** |

## Affordances

| Level | Question | Answer |
| --- | --- | --- |
| Easy | A door has a pull handle, but you're supposed to push it. What is that kind of door called? | **A Norman door** |
| Easy | A flat metal plate on a door tells you where to push. The plate is a... | **Signifier** |
| Easy | (picture) What does the flat plate on the left door tell you to do? | **Push** |
| Medium | (picture) People don't realize they can tap Edit profile on this screen. What is it missing? | **A signifier** |
| Medium | What does an affordance describe? | **What actions an object makes possible for someone** |
| Medium | A button changes color and makes a click sound when you press it. That is... | **Feedback** |
| Medium | (picture) People keep clicking this blue, underlined heading, but it isn't a link. Why do they click? | **It's a false signifier: it looks like a link** |
| Hard | (picture) Which knob turns on the back right burner? Nobody can tell. This stove has poor... | **Mapping** |
| Hard | A SIM card tray only fits one way, so you can't put it in wrong. That is a... | **Constraint** |
| Hard | (picture) Is location sharing on or off? This toggle is confusing because it's missing... | **A clear signifier of its current state** |
| Hardest | "Did that do what I wanted?" is a question about which gulf? | **The gulf of evaluation** |
| Hardest | Who coined the word affordance, before designers borrowed it? | **James J. Gibson, a psychologist** |

## Usability

| Level | Question | Answer |
| --- | --- | --- |
| Easy | (picture) Which usability heuristic is this upload screen serving? | **Visibility of system status** |
| Easy | Gmail lets you undo a sent email for a few seconds. Which heuristic? | **User control and freedom** |
| Medium | (picture) Which usability heuristic does this sign up error fail? | **Help users recognize, diagnose and recover from errors** |
| Medium | (picture) This date picker won't let you choose a day that has already passed. Which heuristic? | **Error prevention** |
| Medium | (picture) You tap the search box and the app shows this. Which heuristic? | **Recognition rather than recall** |
| Medium | (video) Watch Don Norman. Why did he start using the term user experience? | **Interface and usability felt too narrow for everything a person goes through** |
| Medium | (picture) These two dialogs come from the same app. Which heuristic do they break? | **Consistency and standards** |
| Hard | A trash can icon for deleting files is an example of which heuristic? | **Match between system and the real world** |
| Hard | Keyboard shortcuts that experts use and beginners can ignore fit which heuristic? | **Flexibility and efficiency of use** |
| Hard | Testing with about five users finds roughly how much of a design's usability problems? | **About 85 percent** |
| Hard | (picture) Which heuristic does this banking homepage break most? | **Aesthetic and minimalist design** |
| Hardest | Experts review an interface against a set of principles, without users. What is that method called? | **Heuristic evaluation** |
| Hardest | The System Usability Scale is a questionnaire with how many statements? | **10** |

## Research

| Level | Question | Answer |
| --- | --- | --- |
| Easy | "Don't you think this new design is much easier?" is a problem in an interview because it is... | **A leading question** |
| Easy | In a usability test, you ask people to say what they're thinking as they work. What is that called? | **Think aloud** |
| Easy | (picture) A team pins this up to remind them who they're designing for. What is it? | **A persona** |
| Medium | Two versions of a page go to two random groups of real users to see which performs better. What is that? | **An A/B test** |
| Medium | You put interview notes on sticky notes and group similar ones to find patterns. What is that called? | **Affinity mapping** |
| Medium | What is the difference between what people say and what people do called in research? | **The say do gap** |
| Medium | (picture) What is this kind of strongly disagree to strongly agree scale called? | **A Likert scale** |
| Hard | You watch and talk with someone while they do the work in their own setting. What is that method? | **Contextual inquiry** |
| Hard | Participants log their experience over days or weeks, in the moment. What method is that? | **A diary study** |
| Hard | (picture) Eye tracking on text heavy pages often produces this heatmap shape. What is it called? | **The F pattern** |
| Hard | (picture) What's wrong with this survey question? | **It asks about two things at once** |
| Hardest | Checking a finding against a second source, like analytics plus interviews, is called... | **Triangulation** |
| Hardest | You keep interviewing until new interviews stop revealing anything new. That point is called... | **Saturation** |

## Information Architecture

| Level | Question | Answer |
| --- | --- | --- |
| Easy | (picture) What is the trail of links at the top of this page called? | **Breadcrumbs** |
| Easy | Which question does a content inventory answer? | **What is there?** |
| Easy | (picture) This diagram of a site's pages and how they nest is called a... | **Sitemap** |
| Medium | People sort topic cards into groups and name the groups themselves. What kind of card sort is that? | **An open card sort** |
| Medium | In a content audit, ROT stands for... | **Redundant, outdated, trivial** |
| Medium | (picture) This wide panel of grouped links that drops down from the top menu is called a... | **Mega menu** |
| Hard | (picture) You need to pay a parking ticket on this city site. What is wrong with these menu labels? | **They have weak information scent** |
| Hard | People try to find items using only a text version of the menu, with no visual design. What is that test? | **A tree test** |
| Hard | Showing only the basics first and revealing advanced options when asked is called... | **Progressive disclosure** |
| Hard | The cues in a link's words that tell you whether it leads to what you want are called... | **Information scent** |
| Hard | (picture) Filtering by size, color and price at the same time, like this, is called... | **Faceted navigation** |
| Hardest | Creating content once in a structured form so it can appear on a website, an app and a watch is called... | **Create once, publish everywhere** |
| Hardest | A vocabulary of approved terms so everyone tags and labels content the same way is called... | **A controlled vocabulary** |
| Hardest | (picture) In this grocery site's structure, Tomato sits under both Fruit and Vegetables. What is that called? | **A polyhierarchy** |

## Maps & Flows

| Level | Question | Answer |
| --- | --- | --- |
| Easy | Which map answers "What happens, step by step?" | **A task flow** |
| Easy | Which map answers "What is the experience of it happening?" | **A journey map** |
| Easy | (picture) In this task flow, what does the highlighted diamond mean? | **A decision** |
| Medium | (picture) Boxes with an X for images, grey bars for text, and no color. What is this? | **Wireframe** |
| Medium | Drawing a sequence of frames that shows a person, their setting and what happens around the screen is a... | **Storyboard** |
| Medium | (picture) The line rising and falling across this journey map shows... | **How the person feels at each stage** |
| Medium | (picture) Both screens show the same idea. Compared with the left one, the right one has higher... | **Fidelity** |
| Hard | On a service blueprint, what does the line of visibility separate? | **What the customer sees from what happens out of sight** |
| Hard | A person behind a curtain secretly plays the computer while someone tests a prototype. What is that called? | **A Wizard of Oz prototype** |
| Hard | Every place a person interacts with a service, like a sign, an app, a phone call or a counter, is called a... | **Touchpoint** |
| Hardest | On a Wardley map, the horizontal axis runs from Genesis to... | **Commodity** |
| Hardest | A list of every state a screen can be in, like empty, loading, error and done, is called a... | **State inventory** |
| Hardest | (picture) Activities run across the top, details stack underneath, and a line marks the first release. What is this? | **A user story map** |

## Accessibility

| Level | Question | Answer |
| --- | --- | --- |
| Easy | (picture) What is the main accessibility problem on this sign in screen? | **The text is too faint against the background** |
| Easy | What is alt text for? | **Describing an image for people who can't see it** |
| Easy | Software that reads the screen aloud for blind and low vision users is called a... | **Screen reader** |
| Easy | (picture) A screen reader reads this photo out loud as "Image. IMG_4032.jpg". What's missing? | **Alt text** |
| Medium | (picture) Two fields on this checkout form have a problem. Who does this design fail first? | **People who can't tell red from other colors** |
| Medium | Curb cuts were made for wheelchairs but help strollers, carts and bikes too. What is that idea called? | **The curb cut effect** |
| Medium | (picture) This form has no labels, only grey hint text inside each box. What goes wrong? | **The hint disappears when you type, so people lose track of what each box is for** |
| Hard | The four principles of web accessibility, POUR, stand for perceivable, operable, understandable and... | **Robust** |
| Hard | Someone can't use a mouse and moves through a page with the Tab key. What must every control show? | **A visible focus state** |
| Hard | (picture) A screen reader user pulls up this list of every link on the page. What's the problem? | **The links don't make sense out of context** |
| Hardest | What contrast ratio does WCAG AA require for normal sized body text? | **4.5 to 1** |
| Hardest | Apple's guidelines say tap targets should be at least how big? | **44 by 44 points** |

## Deceptive Design

| Level | Question | Answer |
| --- | --- | --- |
| Easy | Signing up takes two taps. Canceling takes a phone call during business hours. Which pattern? | **Hard to cancel** |
| Easy | An app asks you to turn on notifications every single time you open it. Which pattern? | **Nagging** |
| Medium | (picture) Look at what's already selected before you pay. Which pattern? | **Preselection** |
| Medium | (picture) This ticket app's timer starts over every time you reload the page. Which pattern is the timer? | **Fake urgency** |
| Medium | "No thanks, I don't like saving money" on a decline button. Which pattern? | **Confirmshaming** |
| Medium | (picture) Only the small blue link is the real download. Which pattern are the big green buttons? | **Disguised ads** |
| Hard | (picture) Look at the two choices on this cookie banner. Which pattern? | **Visual interference** |
| Hard | (picture) These fees only show up on the last step of checkout. Which pattern? | **Hidden costs** |
| Hard | "Only 2 left in stock!" when there are plenty. Which pattern? | **Fake scarcity** |
| Hard | (picture) Why is it so hard to tell which of these plans is cheapest? | **Comparison prevention: each price uses a different unit** |
| Hard | (picture) You can't see your quiz results until you do this. Which pattern? | **Forced action** |
| Hardest | "Uncheck this box if you would prefer not to stop receiving emails." Which pattern? | **Trick wording** |
| Hardest | Before "deceptive patterns", what were these commonly called? | **Dark patterns** |

## Wayfinding & Cities

| Level | Question | Answer |
| --- | --- | --- |
| Easy | (picture) What is the dirt trail worn across this lawn called? | **Desire path** |
| Easy | A tall clock tower you can see from all over town and use to orient yourself is a... | **Landmark** |
| Easy | (picture) Why do airport signs lean on symbols like these? | **People who don't read the local language can still follow them** |
| Medium | In a wayfinding study, the moments where someone has to choose which way to go are called... | **Decision points** |
| Medium | A busy plaza where several streets meet and people gather is which of Lynch's elements? | **Node** |
| Medium | (picture) Who are these raised yellow bumps at the edge of the curb mainly for? | **People who are blind or have low vision** |
| Hard | A river or rail line that acts as a boundary people don't travel along is which of Lynch's elements? | **Edge** |
| Hard | Kevin Lynch's word for how easily a city forms a strong picture in people's minds is... | **Imageability** |
| Hard | How many elements did Kevin Lynch use to describe a person's mental map of a city? | **Five** |
| Hard | (picture) In Kevin Lynch's terms, the shaded neighborhood on this sketch map is a... | **District** |
| Hardest | A "You are here" map on a wall should be oriented so that... | **Up on the map is the direction you're facing** |
| Hardest | Someone gets lost, notices, and finds their way back on track. What part of wayfinding is that? | **Recovery** |

## Screens & States

| Level | Question | Answer |
| --- | --- | --- |
| Easy | (picture) The red number on this app icon is called a... | **Badge** |
| Easy | (picture) What is the dark bar at the bottom of this chat app called in Material 3? | **Snackbar** |
| Easy | (picture) What do designers call this screen in a music app? | **An empty state** |
| Easy | (picture) A box that blocks the rest of the screen until you respond to it is called a... | **Modal dialog** |
| Easy | (picture) These FAQ sections that open and close when you tap them are called... | **An accordion** |
| Medium | (picture) What is the row of icons along the bottom of this app called? | **A bottom navigation bar** |
| Medium | (picture) A social feed shows this for a second while it loads. What are these grey shapes called? | **A skeleton screen** |
| Medium | A form tells you your password is too short while you're still typing. What is that called? | **Inline validation** |
| Medium | Material 3's round button that floats above the content for a screen's main action is the... | **Floating action button** |
| Medium | (picture) The three joined buttons at the top that switch the chart view are a... | **Segmented control** |
| Hard | (picture) This transit app hides trip planning, fares and alerts behind the three line icon. What usually happens? | **People use those hidden features less** |
| Hard | A reusable set of components, styles and rules that a team shares is called a... | **Design system** |
| Hard | Named values like color.primary or spacing.medium that a design system uses everywhere are called... | **Design tokens** |
| Hard | (picture) This Continue button stays greyed out. What makes it frustrating? | **It doesn't say what's missing** |
| Hardest | Instead of "Are you sure you want to delete?", many apps delete right away and offer Undo. Why? | **People click through confirmations without reading them** |
| Hardest | Most products design a rich welcome for new users and almost nothing for when people leave. Designing that exit is called... | **Offboarding** |

## Words on Screen

| Level | Question | Answer |
| --- | --- | --- |
| Easy | A product's consistent personality is its voice. How that personality adjusts to the situation is its... | **Tone** |
| Easy | The small bits of text on buttons, labels, hints and errors are often called... | **Microcopy** |
| Easy | (picture) What's this error message missing? | **What happened and what to do next** |
| Medium | Which is the better button label for submitting a benefits application? | **Submit application** |
| Medium | Which error message does its job best? | **Enter a date in the future, like 10/20/2026** |
| Medium | (picture) Which button is written in sentence case? | **Button 2** |
| Hard | (picture) What is the biggest writing problem in this dialog? | **The buttons don't say what they do** |
| Hard | Before button labels or layouts, some writers recommend starting interface work in which tool? | **A plain text editor** |
| Hard | Designing for a person who is panicked, grieving or rushed, instead of the calm average user, is designing for... | **Stress cases** |
| Hard | (picture) The mockup used placeholder text. What problem did that hide? | **The real content doesn't fit the layout** |
| Hardest | A pool schedule lists classes as SS, SB1, SB2 and ST1 with no names. Which writing rule does it break? | **Don't use internal codes as labels** |
| Hardest | Writing so people can find what they need, understand it and use it the first time they read it is called... | **Plain language** |

## Sound & Motion

| Level | Question | Answer |
| --- | --- | --- |
| Easy | (sound) You tap Pay and hear this. What most likely happened? | **The payment went through** |
| Easy | (animation) You enter the wrong passcode and the dots do this. What is the shake telling you? | **That didn't work, try again** |
| Easy | (animation) Someone taps Pay and nothing changes for 3 seconds. What should the button do right away? | **Show that the tap registered, like a pressed state or a spinner** |
| Easy | (animation) What is this gesture called? | **Pull to refresh** |
| Medium | (sound) You submit a form and hear this. Besides the sound, what should the screen do? | **Show a message that says what went wrong and how to fix it** |
| Medium | (sound) Phones play this when you take a screenshot, even though there's no shutter. What kind of design is this? | **Skeuomorphic: it borrows a cue from a physical object** |
| Medium | (animation) This menu slides in fast and slows down as it stops. Which easing is that? | **Ease out** |
| Medium | (animation) Why does the mug fly into the cart icon? | **It shows people where the item went** |
| Hard | (sound) A desktop makes this sound when you empty the trash. A sound that imitates the real world action is called... | **An auditory icon** |
| Hard | (animation) This upload takes about two minutes. What should replace the spinner? | **A progress bar that shows how much is done** |
| Hardest | (sound) Abstract tones like this, which don't imitate any real world sound, are called... | **Earcons** |
| Hardest | (sound) A monitor beeps faster and higher as a patient's pulse rises. Turning data into sound like this is called... | **Sonification** |
| Hardest | (animation) Big motion like this parallax scrolling can make some people dizzy or sick. What should the site do? | **Respect the reduce motion setting and tone the motion down** |

## Research Synthesis

| Level | Question | Answer |
| --- | --- | --- |
| Easy | Several interview notes describe people getting lost at the same hallway split. What is the shared theme? | **Uncertainty at a decision point** |
| Easy | A team groups related sticky notes after interviews. What should the groups help them find? | **Patterns and questions worth investigating** |
| Easy | A user mentions a confusing menu and a missing pickup sign. What is a useful synthesis question? | **Which parts of ordering and pickup create different problems?** |
| Medium | Staff say a sign is ignored; visitors say they used it and still got lost. What belongs in the findings? | **Both accounts and the discrepancy between them** |
| Medium | The same confusion appears in three interviews and a field observation. How should you describe it? | **A recurring issue supported by multiple sources** |
| Medium | (picture) A journey diagram shows a sharp drop in confidence during a wait. What's a productive next step? | **Check which events or missing information produced the drop** |
| Hard | The pantry has two clusters: confusion about item limits and fear that groceries run out. How should the team proceed? | **Define the chosen problem and show how the evidence supports it** |
| Hard | Interviews, observations, and a client memo offer different explanations for a long queue. What should guide synthesis? | **Look for causes supported across the available evidence** |
| Hard | Four findings all concern the moment visitors enter City Hall. What would strengthen the team's summary? | **Connect the findings to the exact decisions visitors face on arrival** |
| Hardest | Two of six interviewees had a serious access barrier. What's the most defensible research statement? | **A consequential barrier was found, with its prevalence still uncertain** |
| Hardest | A team finds that unclear instructions and staffing shortages both delay check-in. What should its recommendation distinguish? | **Which issues the proposed interaction can change and which need other action** |
| Hardest | A teammate writes, Users need a more modern interface. What would make this a stronger finding? | **Specific observed difficulties and the tasks affected** |

## Figma

| Level | Question | Answer |
| --- | --- | --- |
| Easy | In Figma, the container you draw a screen inside, with its own size, fill and layout settings, is a... | **Frame** |
| Easy | Figma's online whiteboard for sticky notes, workshops and affinity mapping is called... | **FigJam** |
| Easy | (picture) In the layers panel, what does the purple four diamond icon next to Button mean? | **It's a main component** |
| Medium | (picture) This Button has a single hollow diamond. It's a linked copy of a main component, called... | **An instance** |
| Medium | (animation) The frame adds even gaps between buttons and grows when you add one. Which Figma feature? | **Auto layout** |
| Medium | One component with options like size small or large and state default or pressed is a set of... | **Variants** |
| Hard | (picture) When the frame stretches, the Next button stays pinned to the bottom right. Which setting does that? | **Constraints** |
| Hard | (picture) What do these blue arrows between screens in Figma's Prototype tab set up? | **Interactions: what happens on a tap and which screen comes next** |
| Hard | Smart animate moves layers smoothly between two screens by matching their... | **Layer names** |
| Hardest | Named values like color/primary that can switch between a light mode and a dark mode are Figma... | **Variables** |
| Hardest | Figma's view for developers, for checking spacing and copying CSS from a design, is called... | **Dev Mode** |

## Prototyping & Testing

| Level | Question | Answer |
| --- | --- | --- |
| Easy | You need to check whether a sign belongs before a hallway split. What's a suitable first prototype? | **A paper sign placed at the decision point** |
| Easy | What makes a prototype testable? | **Another person can attempt a meaningful task with it** |
| Easy | (picture) Why might you start with this rough layout? | **To test structure and sequence before refining the visuals** |
| Medium | (picture) A person clicks this disabled Continue button several times. What's the useful design question? | **What requirement is missing, and how should the interface explain it?** |
| Medium | Which instruction is a better usability test task? | **You need a Saturday pool pass. Show me how you would get one** |
| Medium | (picture) People repeatedly click Pay and see no response. Which state should the prototype include? | **Immediate feedback that the action was received** |
| Hard | A form loses a user's answers when the connection fails. What should you prototype next? | **An error and recovery path that preserves entered information** |
| Hard | You want to compare two checkout approaches. What keeps the test useful? | **Ask participants to perform the same goal under comparable conditions** |
| Hard | You're testing a lobby navigation system. What gives better evidence than a click-through alone? | **A walkthrough with signs placed where choices happen** |
| Hardest | Most testers complete the task, but one using a screen reader cannot. What should the team do? | **Investigate the barrier and revise the accessible interaction** |
| Hardest | Participants finish checkout but misunderstand a required fee. What does testing show? | **Task completion and comprehension need separate evaluation** |
| Hardest | After testing, the team moves the sign earlier and runs the task again. What is the strongest evidence of improvement? | **People now choose the right corridor with less hesitation** |

## Fieldwork & Observation

| Level | Question | Answer |
| --- | --- | --- |
| Easy | You watch four customers look around before finding the coffee pickup shelf. What have you recorded? | **Observed hesitation before pickup** |
| Easy | (picture) People cut across this lawn instead of using the paved path. What should you investigate first? | **Where they start, where they go, and why this route helps** |
| Easy | A building directory hangs behind the line at check-in. What is useful to record during a visit? | **Where people stand when they need directions** |
| Medium | Visitors pause at a corridor split. Which field note is the most useful? | **Three visitors stopped, scanned both corridors, then asked a guard** |
| Medium | Two people complete the same task by different routes. What should you compare? | **Their decision points, cues, delays, and recovery steps** |
| Medium | A visitor points at a lobby map, turns around, and heads the wrong way. What should you document? | **The map's orientation, the visitor's position, and the turn taken** |
| Hard | You observe a bus stop only during a quiet Sunday afternoon. What limits your findings? | **The experience may differ during weekday rush hour** |
| Hard | You want to learn why users struggle at a ticket machine. Which approach gives the strongest direct evidence? | **Watch people attempt a real ticket purchase and note where they pause** |
| Hard | A sign works well in a mockup but visitors miss it in the hallway. What should you examine? | **Sight lines, walking direction, competing signs, and viewing distance** |
| Hardest | Staff say the signs are clear, yet six visitors ask for directions. What should you do? | **Observe the route and compare what staff and visitors encounter** |
| Hardest | (picture) This persona was drafted before any observation or interviews. What makes it useful for design research? | **Checking its claims against actual user behavior and interviews** |
| Hardest | Two shoppers hesitate at the same shelf, but one is looking for prices and the other for allergies. What should you conclude? | **The same visible hesitation may have different causes** |

## Evidence or Assumption?

| Level | Question | Answer |
| --- | --- | --- |
| Easy | A researcher notes: Three riders asked the driver where to transfer. What kind of statement is this? | **An observation** |
| Easy | A manager says, People never read our signs. What is this statement? | **A claim that needs supporting evidence** |
| Easy | (picture) This Continue button looks inactive. What can you establish from the screenshot alone? | **The button appears disabled** |
| Medium | Five participants failed to find a pickup counter. Which conclusion is justified? | **Those five struggled during the observed tasks** |
| Medium | (picture) These menu labels say Solutions, Resources, Explore, and More. Which statement is an observation? | **The labels use broad category names** |
| Medium | Which field note best separates evidence from interpretation? | **A visitor tried Door B twice; perhaps its handle suggests pulling** |
| Hard | Eight survey respondents say they would use a new kiosk. What evidence do you have? | **Their stated intention, which may differ from actual use** |
| Hard | A client asks for an app because the counter line is long. What's the status of the app idea? | **A proposed solution whose effect still needs to be tested** |
| Hard | Interviews say the directions are clear, but observation shows wrong turns. What should a researcher do? | **Keep both findings and investigate the difference** |
| Hardest | A website poll reports 90% approval from eight voluntary responses. What is the main limitation? | **The small, self-selected sample may not represent all users** |
| Hardest | A generated research summary cites complaints that appear nowhere in the supplied notes. What's the right next step? | **Check each claim against the original evidence before using it** |
| Hardest | A screen recording shows an error after payment. Which claim goes beyond the available evidence? | **All payments made through this service will fail** |

## Building for the Web

| Level | Question | Answer |
| --- | --- | --- |
| Easy | On GitHub Pages, which file loads when someone visits the site's main address? | **index.html** |
| Easy | In HTML, which tag makes a link? | **<a>** |
| Easy | (picture) Instead of the photo, the page shows this. What's the most likely cause? | **The image's file path is wrong** |
| Medium | Two CSS rules with the same specificity disagree. Which one wins? | **The one that comes later** |
| Medium | Which HTML element should wrap a site's main navigation links? | **<nav>** |
| Medium | (picture) Which part of the CSS box model is the arrow pointing at? | **Margin** |
| Hard | How many <h1> headings should a typical page have? | **One** |
| Hard | A layout that rearranges itself to fit a phone, a tablet and a laptop is called... | **Responsive design** |
| Hard | (picture) Which flexbox rule spreads three boxes out like this? | **justify-content: space-between** |
| Hardest | You're on logs/week3.html. Which link goes back to the index.html one folder up? | **../index.html** |
| Hardest | Which CSS property sets the space inside an element's border? | **padding** |
| Hardest | (picture) This page's CSS is responsive, but a phone still shows it shrunk down like this. What's missing from its <head>? | **The viewport meta tag** |

## Daily Doubles

| Category | Question | Answer |
| --- | --- | --- |
| Deceptive Design | (picture) Look at the decline link. Which pattern is this? | **Confirmshaming** |
| Affordances | (video) Watch the clip. What makes a door a Norman door? | **Its design sends the wrong signal, so it needs a sign** |
| Accessibility | (picture) A rider without a smartphone reaches this gate. What is the core design problem? | **It offers only one way in, so it locks out anyone without that device** |
| Wayfinding & Cities | (picture) This is a resident's sketch map. In Kevin Lynch's terms, the highlighted river is a... | **Edge** |
| Information Architecture | (picture) A city pool website opens like this. What is the biggest problem? | **Weak hierarchy: every option has the same weight, so nothing stands out** |
| Screens & States | (picture) A city app shows this when you try to report a broken streetlight. What problem is the screen designed to prevent? | **Many people filing duplicate reports of the same problem** |
| UX Laws | (picture) Why is it so hard to close this ad on a phone? | **Fitts's law: the target is tiny and far from your thumb** |
| Deceptive Design | (picture) You only picked a flight. Which pattern is at work in this cart? | **Sneaking into the basket** |
| Gestalt | (picture) You see five overlapping rings, not a pile of curved pieces. Which principle? | **Prägnanz** |

## Final wager pool

| Category | Question | Answer |
| --- | --- | --- |
| UX Laws | Under the Doherty threshold, a system should respond within about how many milliseconds to keep people engaged? | **400** |
| Accessibility | What contrast ratio does WCAG AA require for normal sized body text? | **4.5 to 1** |
| Wayfinding & Cities | Kevin Lynch studied three American cities for The Image of the City. Which was NOT one of them? | **Chicago** |
| Design Decisions | A clinic requests new lobby signs. Patients keep arriving at the wrong building because their reminders use an old name. What's the strongest first change? | **Correct the reminder and align the wayfinding labels** |
| Usability | Which of Jakob Nielsen's ten usability heuristics comes first on the list? | **Visibility of system status** |
| Maps & Flows | The Design Council's double diamond runs discover, define, develop and... | **Deliver** |
| Affordances | The Design of Everyday Things first came out under another title, The Psychology of Everyday Things. In what year? | **1988** |
