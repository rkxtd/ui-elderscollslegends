import React from "react";
import renderer from 'react-test-renderer';
import { describe, it } from "@jest/globals";
import { shallow } from "enzyme";
import CardsGrid from "./CardsGrid";

const cards = [{
  id: 'card1',
  imageUrl: '',
  name: 'Card 1',
  type: 'Type 1',
  text: 'Text on Card 1',
  set: { name: 'Set 1' },
}, {
  id: 'card2',
  imageUrl: '',
  name: 'Card 2',
  type: 'Type 1',
  text: 'Text on Card 2',
  set: { name: 'Set 1' },
}, {
  id: 'card3',
  imageUrl: '',
  name: 'Card 3',
  type: 'Type 2',
  text: 'Text on Card 3',
  set: { name: 'Set 1' },
}];

describe("Test CardsGrid Component", () => {
  describe("Test shallow component", () => {
    it("renders empty grid without crashing.", () => {
      shallow(<CardsGrid cards={[]} />);
    });

    it("renders grid with cards.", () => {
      shallow(<CardsGrid cards={cards} />);
    });

    it("renders grid with cards and error message.", () => {
      shallow(<CardsGrid cards={cards} errorMessage={"API ERROR"} />);
    });
  });

  describe("Test Snapshot", () => {
    it('renders without cards.', () => {
      const tree = renderer
        .create(<CardsGrid cards={[]} />)
        .toJSON();
      expect(tree).toMatchSnapshot();
    });

    it('renders with cards.', () => {
      const tree = renderer
        .create(<CardsGrid cards={cards} />)
        .toJSON();
      expect(tree).toMatchSnapshot();
    });

    it('renders with cards and error message.', () => {
      const tree = renderer
        .create(<CardsGrid cards={cards} errorMessage={"API ERROR"} />)
        .toJSON();
      expect(tree).toMatchSnapshot();
    });
  })
});
