import React from 'react';
import {configure, shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import NavigationItems from './NavigationItems';
import NavigationItem from './NavigationItem/NavigationItem';

/*
Test koristi JEST po defaultu. 
 JEst nam da je nekoliko opcija za definisemo test. 
-describe ne moramo da importujemo, bit ce automatski dostupno u nasem create react appu
describe prima dva parametra:

1) prvi je opis test bundle-a, to cemo vidjeti poslije u console ouputu, bitno je da moze identifikovati na sta se test odnosi

2) drugi je nasa testing function (normal ES6 arrow function)

Ideja iza enzyma je da nam dopusta da pisemo unit tests, isolated tests. (testove u kojima ne trebamo da renderujemo cijeli react app)
 */

 configure({adapter: new Adapter()});

 describe('<NavigationItems />', ()=> {
     it('should render two <NavigationItem/> elements if not authenticated', ()=> {  //it describes or allows us to write individual test, prima 2 argumenta
      const wrapper = shallow (<NavigationItems/>);
      //sada pisemo nasa ocekivanja 
      expect(wrapper.find(NavigationItem)).toHaveLength(2);

     }); 

 });