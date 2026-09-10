// RemoveHashOnReload renders nothing — it is a side-effect component, mounted
// once in app/layout.tsx next to the page tree. There is no markup to show,
// so this card is an honest typographic note rather than a faked rendering.
export const NoUI = () => (
  <div className='flex w-full flex-col gap-4 rounded-xl bg-colored-background p-6'>
    <p className='text-xs font-medium uppercase text-muted-foreground tracking-wider'>
      Renders no UI
    </p>
    <h2 className='text-4xl'>RemoveHashOnReload</h2>
    <p className='md:w-2/3'>
      A side-effect component. It returns <code>null</code> — mounting it
      produces no DOM node, so it has no visual story.
    </p>
    <p className='md:w-2/3 text-muted-foreground'>
      On mount it inspects the Navigation Timing entry: when the page arrived
      by a <em>reload</em> and the URL still carries a hash, it calls{' '}
      <code>history.replaceState</code> to strip the fragment. That stops a
      refresh from silently jumping back to <code>#projects</code> or{' '}
      <code>#contact</code> instead of the top of the portfolio.
    </p>
    <p className='md:w-2/3 text-sm text-muted-foreground'>
      Usage: mount once, inside the provider, above the page tree — as
      app/layout.tsx does. It takes no props.
    </p>
  </div>
);
