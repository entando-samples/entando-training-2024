package com.entando.heroesms.service;

import com.entando.heroesms.dto.Hero;
import java.util.List;

public interface HeroService {
    List<Hero> getHeroes();

    Hero createHero(Hero hero);
}
