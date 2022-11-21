package tn.iit.bank.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import tn.iit.bank.entities.Client;

@Repository
public interface ClientRepository extends JpaRepository<Client, String> {

}
