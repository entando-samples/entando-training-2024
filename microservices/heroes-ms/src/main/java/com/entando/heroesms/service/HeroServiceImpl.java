package com.entando.heroesms.service;

import com.entando.heroesms.dto.Hero;
import com.entando.heroesms.model.HeroEntity;
import com.entando.heroesms.repository.HeroRepository;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class HeroServiceImpl implements HeroService {

    private final HeroRepository heroRepository;

    public List<Hero> getHeroes() {
        return this.heroRepository.findAll().stream()
                .map(h -> new Hero(h.getName(), h.getCity(), h.getSuperPower()))
                .toList();
    }

    public Hero createHero(Hero hero) {

        HeroEntity heroEntity = new HeroEntity()
                .setName(hero.name())
                .setCity(hero.city())
                .setSuperPower(hero.superPower());

        final HeroEntity savedHero = this.heroRepository.save(heroEntity);

        return new Hero(savedHero.getName(), savedHero.getCity(), savedHero.getSuperPower());
    }
}
