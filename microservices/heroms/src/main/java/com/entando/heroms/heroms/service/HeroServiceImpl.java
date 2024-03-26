package com.entando.heroms.heroms.service;

import com.entando.heroms.heroms.model.Hero;
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
        return heroRepository.findAll().stream()
                .map(this::toHero)
                .collect(Collectors.toList());
    }

    @Override
    public Hero createHero(Hero hero) {
        HeroEntity heroEntity = new HeroEntity()
                .setName(hero.name())
                .setCity(hero.city())
                .setSuperPower(hero.superPower());

        HeroEntity createdEntity = heroRepository.save(heroEntity);
        return toHero(createdEntity);
    }

    private Hero toHero(HeroEntity he) {
        return new Hero(he.getName(), he.getCity(), he.getSuperPower());
    }
}
