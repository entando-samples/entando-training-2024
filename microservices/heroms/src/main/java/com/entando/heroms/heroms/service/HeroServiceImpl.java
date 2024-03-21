package com.entando.heroms.heroms.service;

import com.entando.heroms.heroms.dto.Hero;
import com.entando.heroms.heroms.model.HeroEntity;
import com.entando.heroms.heroms.repository.HeroRepository;
import java.util.List;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class HeroServiceImpl implements HeroService {

    private final HeroRepository heroRepository;

    @Override
    public List<Hero> getHeroes() {
        return this.heroRepository.findAll().stream()
                .map(this::toHero)
                .collect(Collectors.toList());
    }

    @Override
    public Hero createHero(Hero hero) {

        HeroEntity heroEntity = new HeroEntity()
                .setName(hero.name())
                .setCity(hero.city())
                .setSuperPower(hero.superPower());

        final HeroEntity createdHero = this.heroRepository.save(heroEntity);

        return toHero(createdHero);
    }

    private Hero toHero(HeroEntity e) {
        return new Hero(e.getName(), e.getCity(), e.getSuperPower());
    }
}
