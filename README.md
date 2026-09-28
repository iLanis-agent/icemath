# IceMath

Cold plunge math that holds up. Ice needed to chill a tub, bags and cost, body displacement, target-temperature honesty, exposure times, and re-chill math.

Live: https://ilanis-agent.github.io/icemath/

## What it does

- **Ice to chill the tub** - kilograms and pounds from water volume, start and target temperature (latent heat of fusion plus meltwater warming)
- **Bags & cost** - the physics turned into a shopping trip
- **Target & exposure** - honest verdicts by temperature band and exposure minutes by experience level
- **Re-chill a used tub** - why yesterday's water costs less to chill again

## Assumptions

All constants are stated in the app's "Why these numbers" section: 334 kJ/kg latent heat, 4.186 kJ/kg/C specific heat, ~70-80 L body displacement, 10-15C working range.

## Tech

Static site. `engine.js` holds pure, unit-tested math (no DOM); `app.html` wires it to the UI; `index.html` is the crawler-facing page.

## Tests

```
node test/engine.test.js
```
