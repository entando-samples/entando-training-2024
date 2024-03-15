package com.entando.heroms.service;

import com.entando.heroms.model.HeroDto;
import java.util.List;

public interface HeroService {

    List<HeroDto> getHeroes();

    HeroDto createHero(HeroDto hero);
}
