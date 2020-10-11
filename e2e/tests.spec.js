describe('Marvel', () => {
  it('search', async () => {
    await expect(element(by.id('gallery-top-nav'))).toBeVisible();

    await element(by.id('search')).tap();
    await element(by.id('search')).clearText();
    await element(by.id('search')).typeText('boom');
    await expect(element(by.label('Boom Boom'))).toBeVisible();

    await element(by.id('search')).clearText();
    await expect(element(by.label('Adam Warlock'))).toBeVisible();
  });

  it('view details', async () => {
    await element(by.label('Adam Warlock')).multiTap(2);
    await waitFor(element(by.id('details-top-nav'))).toBeVisible();
    await element(by.id('details-list')).scrollTo('bottom');
    await expect(
      element(by.label('Guardians of the Galaxy (2008) #17')),
    ).toBeVisible();
  });

  it('go back to list', async () => {
    await element(by.id('details-list')).scrollTo('top');
    await element(by.id('back-button')).tap();
    await expect(element(by.label('A.I.M.'))).toBeVisible();
  });
});
