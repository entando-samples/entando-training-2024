package com.entando.heroms.heroms.service;

import com.entando.heroms.heroms.model.Hero;
import java.util.List;

public interface HeroService {

    List<Hero> getHeroes();

    Hero createHero(Hero hero);
}
